import type { Editor } from '@tiptap/vue-3';
import { ref } from 'vue';

interface ToolbarAction {
  type?: 'action';
  slug: string;
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
  { slug: 'bold', name: 'Bold', icon: 'bold', active: 'bold' },
  { slug: 'italic', name: 'Italic', icon: 'italic', active: 'italic' },
  { slug: 'underline', name: 'Underline', icon: 'underline', active: 'underline' },
  { slug: 'strike', name: 'Strike', icon: 'strikethrough', active: 'strike' },
  { type: 'divider' },
  { slug: 'bulletList', name: 'Bullet list', icon: 'list-unordered', active: 'bulletList' },
  { slug: 'orderedList', name: 'Orderred list', icon: 'list-ordered', active: 'orderedList' },
  { type: 'divider' },
  { slug: 'align', option: 'left', name: 'Align left', icon: 'align-left', active: { textAlign: 'left' } },
  { slug: 'align', option: 'center', name: 'Align center', icon: 'align-center', active: { textAlign: 'center' } },
  { slug: 'align', option: 'right', name: 'Align right', icon: 'align-right', active: { textAlign: 'right' } },
  { slug: 'align', option: 'justify', name: 'Align justify', icon: 'align-justify', active: { textAlign: 'justify' } },
  { type: 'divider' },
  { slug: 'link', name: 'Link', icon: 'link', active: 'link' },
  { type: 'divider' },
  { slug: 'undo', name: 'Undo', icon: 'arrow-go-back-line', active: 'undo' },
  { slug: 'redo', name: 'Redo', icon: 'arrow-go-forward-line', active: 'redo' },
  { slug: 'clear', name: 'Clear', icon: 'format-clear', active: 'clear' },
]);

export function onActionClick(editor: Editor, slug: string, option: string | null = null): void {
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
    link: () => vm.toggleLink({ href: '' }).run(),
    undo: () => vm.undo().run(),
    redo: () => vm.redo().run(),
    clear: () => {
      vm.clearNodes().run();
      vm.unsetAllMarks().run();
    },
  };

  actionTriggers[slug]?.();
}

export function onHeadingClick(editor: Editor, event: Event): void {
  const target = event.target as HTMLSelectElement;
  const headingLevel = Number(target.value);
  editor.chain().focus().toggleHeading({ level: headingLevel as 1 | 2 | 3 | 4 | 5 | 6 }).run();
}
