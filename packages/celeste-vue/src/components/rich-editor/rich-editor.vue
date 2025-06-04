<script setup lang="ts">
import CharacterCount from '@tiptap/extension-character-count';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

type ToolbarAction =
  | {
    type?: 'action';
    name: string;
    icon: string;
    active: string | Record<string, unknown>;
    option?: string;
  }
  | {
    type: 'divider';
  };

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  maxLimit: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = ref<Editor | null>(null);
const toolbarActions = ref<ToolbarAction[]>([
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

const charactersCount = computed(() => editor.value?.storage.characterCount.characters() || 0);
const wordsCount = computed(() => editor.value?.storage.characterCount.words() || 0);

const limitWarning = computed(() => {
  const isCloseToMax = charactersCount.value >= (props.maxLimit - 20);
  const isMax = charactersCount.value === props.maxLimit;

  if (isCloseToMax && !isMax)
    return 'warning';
  if (isMax)
    return 'danger';
  return '';
});

watch(() => props.modelValue, (value) => {
  if (editor.value?.getHTML() === value)
    return;
  editor.value?.commands.setContent(value, false);
});

function onActionClick(name: string, option: string | null = null) {
  const vm = editor.value?.chain().focus();
  if (!vm)
    return;

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

function onHeadingClick(index: number) {
  editor.value?.chain().focus().toggleHeading({ level: index as 1 | 2 | 3 | 4 | 5 | 6 }).run();
}

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      CharacterCount.configure({
        limit: props.maxLimit,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value?.getHTML() || '');
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div id="text-editor">
    <div v-if="editor" class="toolbar">
      <!-- Headings -->
      <div class="align-dropdown">
        <button class="dropbtn">
          Heading ▼
        </button>
        <div class="dropdown-content">
          <a
            v-for="index in 6"
            :key="index"
            :class="{ active: editor.isActive('heading', { level: index }) }"
            :style="{ fontSize: `${20 - index}px` }"
            role="button"
            @click="onHeadingClick(index)"
          >
            H{{ index }}
          </a>
        </div>
      </div>

      <div class="divider" />

      <template v-for="(item, index) in toolbarActions" :key="index">
        <button
          v-if="item.type !== 'divider'"
          :class="{ active: editor.isActive(item.active) }"
          @click="onActionClick(item.name, item.option)"
        >
          <i :class="`i-celeste-${item.icon}`" />
        </button>
        <div
          v-else
          class="divider"
        />
      </template>
    </div>

    <EditorContent
      v-if="editor"
      :editor="editor as Editor"
    />

    <div v-if="editor" class="footer">
      <span class="characters-count" :class="maxLimit ? limitWarning : ''">
        {{ charactersCount }}{{ maxLimit ? ` / ${maxLimit} characters` : ' characters' }}
      </span>
      |
      <span class="words-count">
        {{ wordsCount }} words
      </span>
    </div>
  </div>
</template>
