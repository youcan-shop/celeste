export const REGISTRY_SCHEMA_VERSION = 1;

export interface PropEntry {
  name: string;
  type: string;
  values?: string[];
  required: boolean;
  default?: string;
  description?: string;
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
  hasStory: boolean;
}

export interface ComponentRegistry {
  schemaVersion: number;
  version: string;
  generatedAt: string;
  components: Record<string, ComponentEntry>;
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
