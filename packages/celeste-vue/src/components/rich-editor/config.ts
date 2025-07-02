import type { Editor } from '@tiptap/vue-3';
import type { ToolbarChildOption, ToolbarItem } from './types';
import { ref } from 'vue';

export const toolbarActions = ref<ToolbarItem[]>([
  {
    slug: 'heading',
    name: 'Text styles',
    children: [
      { option: 'p', name: 'Normal text', active: 'paragraph' },
      { option: '1', name: 'Heading 1', active: { level: 1 } },
      { option: '2', name: 'Heading 2', active: { level: 2 } },
      { option: '3', name: 'Heading 3', active: { level: 3 } },
      { option: '4', name: 'Heading 4', active: { level: 4 } },
      { option: '5', name: 'Heading 5', active: { level: 5 } },
      { option: '6', name: 'Heading 6', active: { level: 6 } },
    ],
  },
  { type: 'divider' },
  {
    slug: 'fontSize',
    name: 'Font size',
    children: [
      { option: '8px', name: '8', active: { fontSize: '8px' } },
      { option: '10px', name: '10', active: { fontSize: '10px' } },
      { option: '12px', name: '12', active: { fontSize: '12px' } },
      { option: '14px', name: '14', active: { fontSize: '14px' } },
      { option: '16px', name: '16', active: { fontSize: '16px' } },
      { option: '18px', name: '18', active: { fontSize: '18px' } },
      { option: '24px', name: '24', active: { fontSize: '24px' } },
      { option: '30px', name: '30', active: { fontSize: '30px' } },
      { option: '36px', name: '36', active: { fontSize: '36px' } },
      { option: '48px', name: '48', active: { fontSize: '48px' } },
      { option: '60px', name: '60', active: { fontSize: '60px' } },
      { option: '72px', name: '72', active: { fontSize: '72px' } },
      { option: '96px', name: '96', active: { fontSize: '96px' } },
    ],
  },
  { type: 'divider' },
  {
    slug: 'color',
    name: 'Text color',
    children: [
      { option: '#000000', name: 'Black', icon: 'circle-fill', active: { color: '#000000' } },
      { option: '#7B7B7B', name: 'Gray', icon: 'circle-fill', active: { color: '#7B7B7B' } },
      { option: '#335CFF', name: 'Blue', icon: 'circle-fill', active: { color: '#335CFF' } },
      { option: '#FA7319', name: 'Orange', icon: 'circle-fill', active: { color: '#FA7319' } },
      { option: '#7D52F4', name: 'Purple', icon: 'circle-fill', active: { color: '#7D52F4' } },
      { option: '#47C2FF', name: 'Sky', icon: 'circle-fill', active: { color: '#47C2FF' } },
    ],
  },
  { type: 'divider' },
  { slug: 'bold', name: 'Bold', icon: 'bold', active: 'bold' },
  { slug: 'italic', name: 'Italic', icon: 'italic', active: 'italic' },
  { slug: 'underline', name: 'Underline', icon: 'underline', active: 'underline' },
  { slug: 'strike', name: 'Strike', icon: 'strikethrough', active: 'strike' },
  { type: 'divider' },
  { slug: 'bulletList', name: 'Bulleted list', icon: 'list-unordered', active: 'bulletList' },
  { slug: 'orderedList', name: 'Numbered list', icon: 'list-ordered', active: 'orderedList' },
  { type: 'divider' },
  {
    slug: 'align',
    name: 'Text alignment',
    children: [
      { option: 'left', name: 'Left align', icon: 'align-left', active: { textAlign: 'left' } },
      { option: 'center', name: 'Center align', icon: 'align-center', active: { textAlign: 'center' } },
      { option: 'right', name: 'Right align', icon: 'align-right', active: { textAlign: 'right' } },
      { option: 'justify', name: 'Justify', icon: 'align-justify', active: { textAlign: 'justify' } },
    ],
  },
  { type: 'divider' },
  { slug: 'link', name: 'Insert Link', icon: 'link', active: 'link' },
  { type: 'divider' },
  { slug: 'undo', name: 'Undo', icon: 'arrow-go-back-line', active: 'undo' },
  { slug: 'redo', name: 'Redo', icon: 'arrow-go-forward-line', active: 'redo' },
  { slug: 'clear', name: 'Clear', icon: 'format-clear', active: 'clear' },
]);

export function onActionClick(
  editor: Editor,
  slug: string,
  option: string | null = null,
  showLinkBubble?: () => void,
): void {
  const chain = editor.chain().focus();

  if (!chain) {
    return;
  }

  const actionTriggers: Record<string, () => void> = {
    heading: () => {
      if (!option) {
        return;
      }

      if (option === 'p') {
        chain.setParagraph().run();
      }
      else {
        const headingLevel = Number(option);
        chain.toggleHeading({ level: headingLevel as 1 | 2 | 3 | 4 | 5 | 6 }).run();
      }
    },
    fontSize: () => {
      editor.chain().focus().setMark('textStyle', { fontSize: option }).run();
    },
    color: () => {
      editor.chain().focus().setColor(option ?? '#000000').run();
    },
    bold: () => chain.toggleBold().run(),
    italic: () => chain.toggleItalic().run(),
    underline: () => chain.toggleUnderline().run(),
    strike: () => chain.toggleStrike().run(),
    bulletList: () => chain.toggleBulletList().run(),
    orderedList: () => chain.toggleOrderedList().run(),
    align: () => chain.setTextAlign(option ?? 'left').run(),
    link: () => {
      if (showLinkBubble) {
        showLinkBubble();
      }
    },
    undo: () => chain.undo().run(),
    redo: () => chain.redo().run(),
    clear: () => chain.clearNodes().unsetAllMarks().run(),
  };

  actionTriggers[slug]?.();
}

export function selectedOption(editor: Editor, children: ToolbarChildOption[]): string {
  if (!Array.isArray(children)) {
    return '';
  }

  for (const child of children) {
    if (Object.prototype.hasOwnProperty.call(child.active, 'fontSize')) {
      const currentFontSize = editor.getAttributes('textStyle').fontSize || '16px';
      return currentFontSize;
    }

    if (editor.isActive(child.active)) {
      return child.option;
    }
  }

  return children[0].option;
}
