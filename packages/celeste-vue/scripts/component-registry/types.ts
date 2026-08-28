// Output contract for ai/component-registry.json. Bump the schema version on
// any breaking change; consumers read against it.

export const REGISTRY_SCHEMA_VERSION = 1;

export interface PropEntry {
  name: string;
  type: string;
  /** Members, when the type is a string-literal union. */
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
  /** Slot props object, `{}` when the slot takes none. */
  type: string;
  description?: string;
}

export interface ComponentEntry {
  name: string;
  /** Folder the component lives in, e.g. `button`. */
  group: string;
  file: string;
  import: string;
  props: PropEntry[];
  events: EventEntry[];
  slots: SlotEntry[];
  /** Other public components exported from the same folder. */
  siblings: string[];
  story?: string;
  hasStory: boolean;
}

export interface ComponentRegistry {
  schemaVersion: number;
  version: string;
  generatedAt: string;
  components: Record<string, ComponentEntry>;
}

export interface TokenEntry {
  /** Without the leading `--`. */
  name: string;
  category: string;
  value: string;
  dark?: string;
  /** Re-themes under `[data-theme="dark"]`; primitives do not. */
  semantic: boolean;
}

export interface IconEntry {
  name: string;
  category: string;
}
