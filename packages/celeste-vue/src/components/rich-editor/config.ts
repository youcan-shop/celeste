import type { Editor } from '@tiptap/vue-3';
import { ref } from 'vue';

interface ToolbarChildOption {
  option: string;
  name?: string;
  icon?: string;
  active?: string | Record<string, unknown>;
}
interface ToolbarAction {
  type?: 'action';
  slug: string;
  name?: string;
  icon?: string;
  active?: string | Record<string, unknown>;
  option?: string;
  children?: ToolbarChildOption[];
}

interface ToolbarDivider {
  type: 'divider';
}

type ToolbarItem = ToolbarAction | ToolbarDivider;

export const toolbarActions = ref<ToolbarItem[]>([
  {
    slug: 'heading',
    name: 'Heading ▼',
    children: [
      { option: '1', name: 'H1', active: 'heading-1' },
      { option: '2', name: 'H2', active: 'heading-2' },
      { option: '3', name: 'H3', active: 'heading-3' },
      { option: '4', name: 'H4', active: 'heading-4' },
      { option: '5', name: 'H5', active: 'heading-5' },
      { option: '6', name: 'H6', active: 'heading-6' },
    ],
  },
  { type: 'divider' },
  {
    slug: 'fontSize',
    children: [
      { option: '12px', name: '12px', active: 'heading-1' },
      { option: '14px', name: '14px', active: 'heading-2' },
      { option: '16px', name: '16px', active: 'heading-3' },
      { option: '20px', name: '20px', active: 'heading-4' },
      { option: '26px', name: '26px', active: 'heading-5' },
      { option: '30px', name: '30px', active: 'heading-6' },
    ],
  },
  { type: 'divider' },
  { slug: 'bold', name: 'Bold', icon: 'bold', active: 'bold' },
  { slug: 'italic', name: 'Italic', icon: 'italic', active: 'italic' },
  { slug: 'underline', name: 'Underline', icon: 'underline', active: 'underline' },
  { slug: 'strike', name: 'Strike', icon: 'strikethrough', active: 'strike' },
  { type: 'divider' },
  { slug: 'bulletList', name: 'Bullet list', icon: 'list-unordered', active: 'bulletList' },
  { slug: 'orderedList', name: 'Orderred list', icon: 'list-ordered', active: 'orderedList' },
  { type: 'divider' },
  {
    slug: 'align',
    children: [
      { option: 'left', name: 'Align left', icon: 'align-left', active: { textAlign: 'left' } },
      { option: 'center', name: 'Align center', icon: 'align-center', active: { textAlign: 'center' } },
      { option: 'right', name: 'Align right', icon: 'align-right', active: { textAlign: 'right' } },
      { option: 'justify', name: 'Align justify', icon: 'align-justify', active: { textAlign: 'justify' } },
    ],
  },
  { type: 'divider' },
  { slug: 'link', name: 'Link', icon: 'link', active: 'link' },
  { type: 'divider' },
  { slug: 'undo', name: 'Undo', icon: 'arrow-go-back-line', active: 'undo' },
  { slug: 'redo', name: 'Redo', icon: 'arrow-go-forward-line', active: 'redo' },
  { slug: 'clear', name: 'Clear', icon: 'format-clear', active: 'clear' },
]);

export function onActionClick(editor: Editor, slug: string, option: string | null = null): void {
  const chain = editor.chain().focus();
  if (!chain) {
    return;
  }

  const actionTriggers: Record<string, () => void> = {
    heading: () => {
      const headingLevel = Number(option);

      chain.toggleHeading({ level: headingLevel as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    },
    fontSize: () => {
      if (!option) {
        editor.chain().focus().unsetMark('textStyle');
      }
      else {
        editor.chain().focus().setMark('textStyle', { style: `font-size: ${option}` });
      }
    },
    bold: () => chain.toggleBold().run(),
    italic: () => chain.toggleItalic().run(),
    underline: () => chain.toggleUnderline().run(),
    strike: () => chain.toggleStrike().run(),
    bulletList: () => chain.toggleBulletList().run(),
    orderedList: () => chain.toggleOrderedList().run(),
    align: () => chain.setTextAlign(option || 'left').run(),
    link: () => chain.toggleLink({ href: '' }).run(),
    undo: () => chain.undo().run(),
    redo: () => chain.redo().run(),
    clear: () => {
      chain.clearNodes().run();
      chain.unsetAllMarks().run();
    },
  };

  actionTriggers[slug]?.();
}
