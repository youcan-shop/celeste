/**
 * Output schema for the Celeste component registry.
 *
 * These types describe the generated `ai/component-registry.json`. They are the
 * contract consumers (and the `celeste` CLI) read against, so treat changes here
 * as breaking and bump `REGISTRY_SCHEMA_VERSION`.
 */

export const REGISTRY_SCHEMA_VERSION = 1;

export interface PropEntry {
  name: string;
  /** Type as TypeScript renders it, with `| undefined` stripped. */
  type: string;
  /** String-literal members, when the type is a union of them. */
  values?: string[];
  required: boolean;
  default?: string;
  description?: string;
}

export interface EventEntry {
  name: string;
  /** Payload tuple, e.g. `[value: boolean | "indeterminate"]`. */
  type: string;
  description?: string;
}

export interface SlotEntry {
  name: string;
  /** Slot props object type, `{}` when the slot takes none. */
  type: string;
  description?: string;
}

export interface ComponentEntry {
  /** Public export name, e.g. `Button`. */
  name: string;
  /** Folder the component lives in, used as its group, e.g. `button`. */
  group: string;
  /** Repo-relative source path. */
  file: string;
  /** What consumers import from. */
  import: string;
  props: PropEntry[];
  events: EventEntry[];
  slots: SlotEntry[];
  /** Other public components exported from the same folder. */
  siblings: string[];
  /** Repo-relative story path, when one exists. */
  story?: string;
  hasStory: boolean;
}

export interface ComponentRegistry {
  schemaVersion: number;
  /** Version of `@youcan/celeste` this registry describes. */
  version: string;
  generatedAt: string;
  components: Record<string, ComponentEntry>;
}

export interface TokenEntry {
  /** CSS custom property name, without the leading `--`. */
  name: string;
  /** Top-level group, e.g. `color`, `spacing`, `shadow`. */
  category: string;
  value: string;
  /** Value under `[data-theme="dark"]`, when the token is themed. */
  dark?: string;
  /**
   * Semantic tokens carry meaning and re-theme automatically; primitives are
   * raw ramp values. Consumers should reach for semantic tokens first.
   */
  semantic: boolean;
}

export interface IconEntry {
  name: string;
  category: string;
}
