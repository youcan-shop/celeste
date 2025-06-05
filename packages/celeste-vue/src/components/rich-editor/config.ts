import type { Editor } from '@tiptap/vue-3';
import { ref } from 'vue';

interface ToolbarAction {
  type?: 'action';
  name: string;
  icon: string;
  active: string | Record<string, unknown>;
  option?: string;
}

interface ToolbarDivider {
  type: 'divider';
}

type ToolbarItem = ToolbarAction | ToolbarDivider;

export const toolbarActions = ref<ToolbarItem[]>([
  { name: 'bold', icon: 'bold', active: 'bold' },
  { name: 'italic', icon: 'italic', active: 'italic' },
  { name: 'underline', icon: 'underline', active: 'underline' },
  { name: 'strike', icon: 'strikethrough', active: 'strike' },
  { type: 'divider' },
  { name: 'bulletList', icon: 'list-unordered', active: 'bulletList' },
  { name: 'orderedList', icon: 'list-ordered', active: 'orderedList' },
  { type: 'divider' },
  { name: 'align', option: 'left', icon: 'align-left', active: { textAlign: 'left' } },
  { name: 'align', option: 'center', icon: 'align-center', active: { textAlign: 'center' } },
  { name: 'align', option: 'right', icon: 'align-right', active: { textAlign: 'right' } },
  { name: 'align', option: 'justify', icon: 'align-justify', active: { textAlign: 'justify' } },
  { type: 'divider' },
  { name: 'subscript', icon: 'subscript-2', active: 'subscript' },
  { name: 'superscript', icon: 'superscript-2', active: 'superscript' },
  { type: 'divider' },
  { name: 'undo', icon: 'arrow-go-back-line', active: 'undo' },
  { name: 'redo', icon: 'arrow-go-forward-line', active: 'redo' },
  { name: 'clear', icon: 'format-clear', active: 'clear' },
]);

export function onActionClick(editor: Editor, name: string, option: string | null = null): void {
  const vm = editor.chain().focus();
  if (!vm) {
    return;
  }

  const actionTriggers: Record<string, () => void> = {
    bold: () => vm.toggleBold().run(),
    italic: () => vm.toggleItalic().run(),
    underline: () => vm.toggleUnderline().run(),
    strike: () => vm.toggleStrike().run(),
    bulletList: () => vm.toggleBulletList().run(),
    orderedList: () => vm.toggleOrderedList().run(),
    align: () => vm.setTextAlign(option || 'left').run(),
    subscript: () => vm.toggleSubscript().run(),
    superscript: () => vm.toggleSuperscript().run(),
    undo: () => vm.undo().run(),
    redo: () => vm.redo().run(),
    clear: () => {
      vm.clearNodes().run();
      vm.unsetAllMarks().run();
    },
  };

  actionTriggers[name]?.();
}

export function onHeadingClick(editor: Editor, index: number): void {
  editor.chain().focus().toggleHeading({ level: index as 1 | 2 | 3 | 4 | 5 | 6 }).run();
}
