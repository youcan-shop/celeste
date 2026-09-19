import type { createComponentChecker } from './extract';
import type { HelperEntry } from './types';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const IMPORT_SPECIFIER = '@youcan/celeste';
const ENTRY_MODULES = ['src/utils/index.ts', 'src/composables/index.ts'];
const TYPE_LIMIT = 160;

const FORMAT = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

// `data?: ToastOptions | undefined` says nothing the `?` does not.
function tidy(text: string): string {
  const cleaned = text.replace(/ \| undefined/g, '');

  return cleaned.length > TYPE_LIMIT ? `${cleaned.slice(0, TYPE_LIMIT - 1)}…` : cleaned;
}

// pnpm nests packages as node_modules/.pnpm/<id>/node_modules/<name>, so the
// last node_modules segment names the package.
function packageOf(file: string): string {
  const matches = [...file.matchAll(/node_modules\/((?:@[^/]+\/)?[^/]+)/g)];

  return matches.at(-1)?.[1] ?? 'celeste';
}

/**
 * What a call returns, field by field. Context composables such as
 * `useSidebar` are generic over `T extends Context | null`, so their return
 * type is conditional; the non-null constraint is the context itself.
 */
function returnedFields(checker: ts.TypeChecker, signature: ts.Signature, declaration: ts.Declaration): string[] {
  let returned = signature.getReturnType();

  if (!checker.getPropertiesOfType(returned).length && signature.typeParameters?.length) {
    const constraint = checker.getBaseConstraintOfType(signature.typeParameters[0]);

    if (constraint)
      returned = checker.getNonNullableType(constraint);
  }

  return checker.getPropertiesOfType(returned).map(property =>
    `${property.name}: ${tidy(checker.typeToString(checker.getTypeOfSymbolAtLocation(property, declaration), declaration, FORMAT))}`);
}

function renderSignature(checker: ts.TypeChecker, name: string, signature: ts.Signature, declaration: ts.Declaration): string[] {
  const full = `${name}${checker.signatureToString(signature, declaration, FORMAT)}`.replace(/ \| undefined/g, '');

  if (full.length <= TYPE_LIMIT)
    return [full];

  const parameters = signature.getParameters().map(parameter => parameter.name).join(', ');
  const fields = returnedFields(checker, signature, declaration);

  return fields.length
    ? [`${name}(${parameters}) returns:`, ...fields.map(field => `  ${field}`)]
    : [tidy(full)];
}

function describeValue(checker: ts.TypeChecker, symbol: ts.Symbol, declaration: ts.Declaration) {
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const signatures = type.getCallSignatures()
    .flatMap(signature => renderSignature(checker, symbol.name, signature, declaration));
  // Methods are listed only on a callable value such as `toast` (`toast.success`).
  // On anything else they are the built-ins of String, RegExp and friends.
  const members = !type.getCallSignatures().length
    ? []
    : checker.getPropertiesOfType(type)
        .flatMap((property) => {
          const propertyType = checker.getTypeOfSymbolAtLocation(property, declaration);

          return propertyType.getCallSignatures().map(signature =>
            `.${property.name}${tidy(checker.signatureToString(signature, declaration, FORMAT))}`);
        });

  if (signatures.length || members.length)
    return { kind: 'function' as const, signatures, members };

  return { kind: 'value' as const, signatures: [`${symbol.name}: ${tidy(checker.typeToString(type, declaration, FORMAT))}`], members: [] };
}

function describeType(checker: ts.TypeChecker, symbol: ts.Symbol, declaration: ts.Declaration, packageRoot: string) {
  const type = checker.getDeclaredTypeOfSymbol(symbol);
  const properties = type.isUnion() ? [] : checker.getPropertiesOfType(type);

  if (!properties.length)
    return { kind: 'type' as const, signatures: [`${symbol.name} = ${tidy(checker.typeToString(type, declaration, FORMAT))}`], members: [] };

  const own: string[] = [];
  const inherited = new Map<string, string[]>();

  for (const property of properties) {
    const file = property.declarations?.[0]?.getSourceFile().fileName ?? '';

    if (file.startsWith(resolve(packageRoot, 'src'))) {
      const optional = property.flags & ts.SymbolFlags.Optional ? '?' : '';
      own.push(`${property.name}${optional}: ${tidy(checker.typeToString(checker.getTypeOfSymbolAtLocation(property, declaration), declaration, FORMAT))}`);
    }
    else {
      const source = packageOf(file);
      inherited.set(source, [...(inherited.get(source) ?? []), property.name]);
    }
  }

  return {
    kind: 'type' as const,
    signatures: [],
    members: [
      ...own,
      ...[...inherited].map(([source, names]) => `inherited from ${source}: ${names.join(', ')}`),
    ],
  };
}

/**
 * Everything exported from utils and composables: `toast`, `useSidebar`, the
 * chart formatters. Agents otherwise grep `dist/` for these, several times.
 */
export function buildHelperIndex(
  componentChecker: ReturnType<typeof createComponentChecker>,
  packageRoot: string,
): Record<string, HelperEntry> {
  const program = componentChecker.getProgram();

  if (!program)
    throw new Error('vue-component-meta returned no TypeScript program');

  const checker = program.getTypeChecker();
  const helpers: Record<string, HelperEntry> = {};

  for (const entry of ENTRY_MODULES) {
    const source = program.getSourceFile(resolve(packageRoot, entry));
    const module = source && checker.getSymbolAtLocation(source);

    if (!module)
      throw new Error(`Could not load ${entry}`);

    for (const exported of checker.getExportsOfModule(module)) {
      const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
      const declaration = symbol.declarations?.[0];

      if (!declaration)
        continue;

      const isType = symbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias);
      const described = isType
        ? describeType(checker, symbol, declaration, packageRoot)
        : describeValue(checker, symbol, declaration);
      const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).replace(/\s+/g, ' ').trim();

      helpers[exported.name] = {
        name: exported.name,
        kind: described.kind,
        file: relative(packageRoot, declaration.getSourceFile().fileName),
        import: IMPORT_SPECIFIER,
        signatures: described.signatures,
        members: described.members,
        ...(description ? { description } : {}),
      };
    }
  }

  return helpers;
}
