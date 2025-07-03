export interface ToolbarChildOption {
  option: string;
  name: string;
  icon?: string;
  active: string | Record<string, unknown>;
}

interface ToolbarAction {
  type?: 'action';
  slug: string;
  name?: string;
  icon?: string;
  active?: string | Record<string, unknown>;
  children?: ToolbarChildOption[];
}

interface ToolbarDivider {
  type: 'divider';
}

export type ToolbarItem = ToolbarAction | ToolbarDivider;
