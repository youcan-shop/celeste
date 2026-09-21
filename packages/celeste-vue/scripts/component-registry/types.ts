export const REGISTRY_SCHEMA_VERSION = 1;

export interface PropEntry {
  name: string;
  type: string;
  values?: string[];
  required: boolean;
  default?: string;
  description?: string;
  /** Declared by a dependency (reka-ui) and passed through unchanged. */
  inherited?: boolean;
}

export interface EventEntry {
  name: string;
  type: string;
  description?: string;
}

export interface SlotEntry {
  name: string;
  type: string;
  description?: string;
}

export interface ComponentEntry {
  name: string;
  group: string;
  file: string;
  import: string;
  props: PropEntry[];
  events: EventEntry[];
  slots: SlotEntry[];
  siblings: string[];
  story?: string;
  usage?: string;
  hasStory: boolean;
}

export interface HelperEntry {
  name: string;
  kind: 'function' | 'value' | 'type';
  file: string;
  import: string;
  /** Call signatures for a function, the type for a value or alias. */
  signatures: string[];
  /** Methods of a function object (`toast.success`), or an interface's fields. */
  members: string[];
  description?: string;
}

export interface ComponentRegistry {
  schemaVersion: number;
  version: string;
  generatedAt: string;
  components: Record<string, ComponentEntry>;
  helpers: Record<string, HelperEntry>;
}

export interface TokenEntry {
  name: string;
  category: string;
  value: string;
  dark?: string;
  semantic: boolean;
}

export interface IconEntry {
  name: string;
  category: string;
}

export interface TokenIndex {
  schemaVersion: number;
  version: string;
  generatedAt: string;
  tokens: TokenEntry[];
}

export interface IconIndex {
  schemaVersion: number;
  version: string;
  generatedAt: string;
  prefix: string;
  icons: IconEntry[];
}
