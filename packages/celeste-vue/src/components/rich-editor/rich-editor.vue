<script setup lang="ts">
import CompactButton from '@/components/button/compact-button.vue';
import Tooltip from '@/components/tooltip/tooltip.vue';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { onActionClick, toolbarActions } from './config';

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

const charactersCount = computed(() => editor.value?.storage.characterCount.characters() || 0);

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

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      TextStyle.configure({ mergeNestedSpanStyles: true }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class: 'celeste-rich-editor-link',
          rel: null,
        },
      }),
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
  <div v-if="editor" class="celeste-rich-editor">
    <div class="toolbar">
      <template v-for="(item, index) in toolbarActions" :key="index">
        <Tooltip v-if="item.type !== 'divider' && !item.children">
          <CompactButton
            :icon="`i-celeste-${item.icon}`"
            variant="ghost"
            :class="{ active: editor.isActive(item.active) }"
            @click="onActionClick(editor as Editor, item.slug, item.option)"
          />
        </Tooltip>

        <template v-else-if="item.children">
          <select
            @change="onActionClick(editor as Editor, item.slug, $event.target.value)"
          >
            <option
              value=""
              disabled
              selected
              hidden
            >
              {{ item.name || item.children[0].name }}
            </option>
            <option
              v-for="child in item.children"
              :key="child.option"
              :value="child.option"
            >
              {{ child.name }}
            </option>
          </select>
        </template>
        <div
          v-else
          class="divider"
        />
      </template>
    </div>

    <div class="text-field">
      <EditorContent
        :editor="editor as Editor"
      />

      <div
        v-if="maxLimit"
        class="characters-count"
        :class="{
          warning: limitWarning === 'warning',
          danger: limitWarning === 'danger',
        }"
      >
        {{ charactersCount }}/{{ maxLimit }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.celeste-rich-editor {
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--spacing-12);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--spacing-12) var(--spacing-12) 0 0;
    background: var(--color-bg-white-0);
    gap: var(--spacing-4);

    &:deep(.celeste-cbutton:active) {
      background-color: var(--color-bg-weak-50);
      box-shadow: none;
      color: var(--color-icon-strong-950);
    }

    .celeste-cbutton.active {
      background-color: var(--color-neutral-100);
      color: var(--color-icon-strong-950);
    }

    .divider {
      width: 1px;
      height: 16px;
      margin: 0 3px;
      background: var(--color-stroke-soft-200);
    }
  }

  .text-field {
    position: relative;
    min-height: 88px;
    margin: var(--spacing-12);
    padding-inline-end: var(--spacing-12);
    overflow-y: auto;
    resize: vertical;

    &:deep(.tiptap) {
      min-height: 88px;
      outline: none;

      :first-child {
        margin-top: 0;
      }

      ul,
      ol {
        margin: 1.25rem 1rem 1.25rem 0.4rem;
        padding: 0 1rem;

        li p {
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 2.5rem;
        line-height: 1.1;
        text-wrap: pretty;
      }

      h1,
      h2 {
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
      }

      h1 {
        font-size: 1.4rem;
      }

      h2 {
        font-size: 1.2rem;
      }

      h3 {
        font-size: 1.1rem;
      }

      h4,
      h5,
      h6 {
        font-size: 1rem;
      }

      a {
        color: var(--color-purple-600);
        cursor: pointer;

        &:hover {
          color: var(--color-purple-700);
        }
      }
    }
  }

  .characters-count {
    position: fixed;
    bottom: 22px;
    inset-inline-end: 35px;
    color: var(--color-text-soft-400);
    font: var(--subheading-xxs);

    &.warning {
      color: var(--color-state-warning-base);
    }

    &.danger {
      color: var(--color-state-error-base);
    }
  }
}
</style>
