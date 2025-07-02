<script setup lang="ts">
import CompactButton from '@/components/button/compact-button.vue';
import SelectContent from '@/components/select/select-content.vue';
import SelectIcon from '@/components/select/select-icon.vue';
import SelectItem from '@/components/select/select-item.vue';
import SelectTrigger from '@/components/select/select-trigger.vue';
import SelectValue from '@/components/select/select-value.vue';
import Select from '@/components/select/select.vue';
import Tooltip from '@/components/tooltip/tooltip.vue';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { onActionClick, selectedOption, toolbarActions } from './config';
import { FontSize } from './extensions/font-size';
import LinkBubble from './link-bubble.vue';

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

const editor = ref<Editor | undefined>();
const showSetLinkFromToolbar = ref<boolean>(false);

function openLinkBubbleFromToolbar() {
  showSetLinkFromToolbar.value = true;
}

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
      Color,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: false,
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
            @click="onActionClick(editor, item.slug, null, openLinkBubbleFromToolbar)"
          />
        </Tooltip>

        <Tooltip v-else-if="item.type !== 'divider' && item.children" :title="item.name">
          <div class="select-menu-wrapper">
            <Select
              :model-value="selectedOption(editor, item.children)"
              @update:model-value="onActionClick(editor, item.slug, $event)"
            >
              <SelectTrigger variant="inline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end" width="fit">
                <SelectItem
                  v-for="child in item.children"
                  :key="child.option"
                  :value="child.option"
                >
                  <template v-if="item.slug === 'color'">
                    <SelectIcon>
                      <i :class="`i-celeste-${child.icon}`" :style="{ background: child.option }" />
                    </SelectIcon>
                    <span>{{ child.name }}</span>
                  </template>
                  <template v-else-if="item.slug === 'align'">
                    <SelectIcon>
                      <i :class="`i-celeste-${child.icon}`" />
                    </SelectIcon>
                  </template>
                  <span v-else>{{ child.name }}</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Tooltip>

        <div
          v-else
          class="divider"
        />
      </template>
    </div>

    <div class="text-field">
      <EditorContent
        :editor="editor"
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
    <LinkBubble
      :editor="editor"
      :show-set-link-from-toolbar="showSetLinkFromToolbar"
      @set-link-closed="showSetLinkFromToolbar = false"
    />
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
        margin-bottom: 0;
      }

      h1 {
        margin-top: 2em;
        font-size: 1.7143em;
        line-height: 1.1667;
      }

      h2 {
        margin-top: 1.8em;
        font-size: 1.4286em;
        line-height: 1.2;
      }

      h3 {
        margin-top: 1.8em;
        font-size: 1.4286em;
        line-height: 1.2;
      }

      h4 {
        margin-top: 1.357em;
        font-size: 1em;
        line-height: 1.1429;
      }

      h5 {
        margin-top: 1.667em;
        font-size: 0.8571em;
        line-height: 1.3333;
      }

      h6 {
        margin-top: 1.455em;
        font-size: 0.7857em;
        line-height: 1.4546;
      }

      p {
        margin-top: 0.75rem;
        font-size: 1em;
        line-height: 1.714;
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

  .select-menu-wrapper {
    padding: 0 var(--spacing-4);
  }
}

.celeste-select-item[data-state='checked'] {
  &:deep(.i-celeste-check-line) {
    display: none;
  }
}
</style>
