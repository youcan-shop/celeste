import { promises as fs } from 'node:fs';
import path, { dirname } from 'node:path';
import { compile as compileVue } from '@vue/compiler-dom';
import camelcase from 'camelcase';
import { rimraf } from 'rimraf';

const transform = {
  vue: (svg: string, _: string, format: string) => {
    const { code } = compileVue(svg, {
      mode: 'module',
    });

    if (format === 'esm') {
      return code.replace('export function', 'export default function');
    }

    return code
      .replace(
        // eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/optimal-quantifier-concatenation
        /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/,
        (_match, imports, _quote, mod) => {
          const newImports = imports
            .split(',')
            .map((i: string) => i.trim().replace(/\s+as\s+/, ': '))
            .join(', ');

          return `const { ${newImports} } = require("${mod}")`;
        },
      )
      .replace('export function render', 'module.exports = function render');
  },
};

async function getIcons(dir = './icons'): Promise<Array<{ svg: string; componentName: string }>> {
  const icons = [];

  const files = await fs.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      icons.push(...await getIcons(path.join(dir, file.name)));
    }
    else if (file.isFile() && path.extname(file.name) === '.svg') {
      icons.push({
        svg: await fs.readFile(path.join(dir, file.name), 'utf8'),
        componentName: `${camelcase(file.name.replace(/\.svg$/, ''), { pascalCase: true })}`,
      });
    }
  }

  return icons;
}

function exportAll(icons: Array<{ componentName: string }>, format: string, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      const extension = includeExtension ? '.js' : '';
      if (format === 'esm') {
        return `export { default as ${componentName} } from './${componentName}${extension}'`;
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`;
    })
    .join('\n');
}

async function ensureWrite(file: string, text: string) {
  await fs.mkdir(dirname(file), { recursive: true });
  await fs.writeFile(file, text, 'utf8');
}

async function ensureWriteJson(file: string, json: any) {
  await ensureWrite(file, `${JSON.stringify(json, null, 2)}\n`);
}

async function buildIcons(pkg: string, format: string) {
  let outDir = `./${pkg}`;
  if (format === 'esm') {
    outDir += '/esm';
  }

  const icons = await getIcons();

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      const content = await transform.vue(svg, componentName, format);
      const types = `import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';\ndeclare const ${componentName}: FunctionalComponent<HTMLAttributes & VNodeProps>;\nexport default ${componentName};\n`;

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types)] : []),
      ];
    }),
  );

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format));

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, 'esm', false));
}

async function buildExports() {
  const pkg = {} as { [key: string]: any };

  // to appease Vite's optimizeDeps feature which requires a root-level import
  pkg[`.`] = {
    import: `./index.esm.js`,
    require: `./index.js`,
  };

  // for those that want to read the version from package.json
  pkg[`./package.json`] = { default: './package.json' };

  pkg[`.`] = {
    types: `./dist/index.d.ts`,
    import: `./dist/esm/index.js`,
    require: `./dist/index.js`,
  };
  pkg[`./*`] = {
    types: `./dist/*.d.ts`,
    import: `./dist/esm/*.js`,
    require: `./dist/*.js`,
  };
  pkg[`./*.js`] = {
    types: `./dist/*.d.ts`,
    import: `./dist/esm/*.js`,
    require: `./dist/*.js`,
  };

  pkg[`./esm/*`] = {
    types: `./dist/*.d.ts`,
    import: `./dist/esm/*.js`,
  };
  pkg[`./esm/*.js`] = {
    types: `./dist/*.d.ts`,
    import: `./dist/esm/*.js`,
  };

  return pkg;
}

async function main() {
  const packageJson = JSON.parse(await fs.readFile(`./package.json`, 'utf8'));

  console.log(`Building icons...`);

  await Promise.all([
    rimraf(`./dist/*`, {
      preserveRoot: true,
    }),
  ]);

  await Promise.all([
    await buildIcons('dist', 'cjs'),
    await buildIcons('dist', 'esm'),
  ]);

  packageJson.exports = await buildExports();

  await ensureWriteJson(`./package.json`, packageJson);

  return console.log(`Finished building icons.`);
}

main();
