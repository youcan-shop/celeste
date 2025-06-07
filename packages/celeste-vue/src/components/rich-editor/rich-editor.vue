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
import { isFontSizeActive, onActionClick, toolbarActions } from './config';
import { FontSize } from './extensions/font-size';

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
      TextStyle,
      FontSize,
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
        <Tooltip v-if="item.type !== 'divider' && !item.children" :title="item.name">
          <CompactButton
            :icon="`i-celeste-${item.icon}`"
            variant="ghost"
            :class="{ active: typeof item.active === 'string' && editor.isActive(item.active) }"
            @click="onActionClick(editor as Editor, item.slug)"
          />
        </Tooltip>

        <Tooltip v-else-if="item.type !== 'divider' && item.children" :title="item.name">
          <select
            @change="onActionClick(editor as Editor, item.slug, ($event.target as HTMLSelectElement)?.value)"
          >
            <option
              v-for="child in item.children"
              :key="child.option"
              :value="child.option"
              :selected="item.slug === 'fontSize'
                ? isFontSizeActive(editor as Editor, child.active)
                : editor.isActive(child.active || '')"
            >
              {{ child.name }}
            </option>
          </select>
        </Tooltip>

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

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        margin-bottom: 0px;
      }

      h1 {
        font-size: 1.71429em;
        line-height: 1.16667;
        margin-top: 2em;
      }

      h2 {
        font-size: 1.42857em;
        line-height: 1.2;
        margin-top: 1.8em;
      }

      h3 {
        font-size: 1.42857em;
        line-height: 1.2;
        margin-top: 1.8em;
      }

      h4 {
        font-size: 1em;
        line-height: 1.14286;
        margin-top: 1.357em;
      }

      h5 {
        font-size: 0.857143em;
        line-height: 1.33333;
        margin-top: 1.667em;
      }

      h6 {
        font-size: 0.785714em;
        line-height: 1.45455;
        margin-top: 1.455em;
      }

      p {
        font-size: 1em;
        line-height: 1.714;
        margin-top: 0.75rem;
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
