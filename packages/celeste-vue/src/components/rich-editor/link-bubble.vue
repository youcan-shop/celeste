<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import Button from '@/components/button/button.vue';
import CompactButton from '@/components/button/compact-button.vue';
import LinkButton from '@/components/button/link-button.vue';
import Label from '@/components/label/label.vue';
import Switch from '@/components/switch/switch.vue';
import TextInputAffix from '@/components/text-input/text-input-affix.vue';
import TextInput from '@/components/text-input/text-input.vue';
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  editor: Editor;
  showSetLinkFromToolbar: boolean;
}>();

const emit = defineEmits(['set-link-closed']);

const BubbleMenu = defineAsyncComponent(() =>
  import('@tiptap/vue-3/menus').then(m => m.BubbleMenu),
);

const href = ref('');
const openInNewTab = ref(false);
const editing = ref(false);
const isTextSelected = () => props.editor.state.selection.from !== props.editor.state.selection.to;

const showBubble = computed(() => {
  return editing.value
    || props.editor.isActive('link')
    || (props.showSetLinkFromToolbar && isTextSelected());
});

function startEdit() {
  editing.value = true;

  const attrs = props.editor.getAttributes('link');
  href.value = attrs.href || '';
  openInNewTab.value = attrs.target === '_blank';
}

function removeLink() {
  props.editor.chain().focus().unsetLink().run();
  reset();
}

function reset() {
  editing.value = false;
  href.value = '';
  openInNewTab.value = false;
  emit('set-link-closed');
}

function truncateMiddleUrl(str: string) {
  const maxLength = 40;

  if (str.length <= maxLength) {
    return str;
  }

  const startChars = Math.ceil((maxLength - 3) / 2);
  const endChars = Math.floor((maxLength - 3) / 2);

  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`;
}

function isAllowedUri(): boolean {
  const url = href.value.trim();

  if (!url || url.includes(' ')) {
    return false;
  }

  if (url.startsWith('/')) {
    return true;
  }

  if (url.startsWith('./') || url.startsWith('../')) {
    return false;
  }

  const allowedProtocols = /^(?:https?:|mailto:)/i;
  const disallowedProtocols = /^(?:javascript:|data:)/i;

  if (disallowedProtocols.test(url)) {
    return false;
  }

  if (allowedProtocols.test(url)) {
    return true;
  }

  return false;
}

const isValidUrl = computed(() => isAllowedUri());

function applyLink() {
  if (!href.value || !isValidUrl.value) {
    return;
  }

  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({
      href: href.value,
      target: openInNewTab.value ? '_blank' : null,
    })
    .run();

  reset();
}

const bubbleRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: Event): void {
  const target = event.target as Element;

  if (!bubbleRef.value) {
    return;
  }

  if (bubbleRef.value && bubbleRef.value.contains(target)) {
    return;
  }

  if (target.closest('.i-celeste-link')) {
    return;
  }

  emit('set-link-closed');
}

onMounted(() => {
  props.editor.on('selectionUpdate', () => {
    if (props.editor.isActive('link') || props.showSetLinkFromToolbar) {
      const attrs = props.editor.getAttributes('link');
      href.value = attrs.href || '';
      openInNewTab.value = attrs.target === '_blank';
    }
    else {
      reset();
    }
  });

  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <BubbleMenu
    :should-show="() => true"
    :editor="editor"
    :options="{
      placement: 'bottom',
      offset: {
        mainAxis: 0,
        crossAxis: 12,
      },
    }"
  >
    <div
      v-if="showBubble"
      ref="bubbleRef"
      class="link-bubble"
    >
      <template v-if="editing || (props.showSetLinkFromToolbar && isTextSelected())">
        <div class="set-mode">
          <div class="set-link">
            <TextInput
              v-model="href"
              type="url"
              size="xs"
              placeholder="Paste or type a link"
              class="link-input"
              @keydown.enter="applyLink"
              @keydown.esc="reset"
            >
              <template #leadingNode>
                <TextInputAffix>
                  <i class="i-celeste-link" />
                </TextInputAffix>
              </template>
            </TextInput>
            <Button
              intent="neutral"
              size="xs"
              variant="stroke"
              :disabled="!isValidUrl"
              @click="applyLink"
            >
              Set link
            </Button>
          </div>
          <div class="switch-button-box">
            <Label for="open-in-new-tab">
              Open in new tab
            </Label>
            <Switch id="open-in-new-tab" v-model:checked="openInNewTab" />
          </div>
        </div>
      </template>

      <template v-else-if="props.editor.isActive('link')">
        <div class="edit-mode">
          <LinkButton
            :href="editor.getAttributes('link').href"
            :target="editor.getAttributes('link').target"
          >
            {{ truncateMiddleUrl(editor.getAttributes('link').href) }}
          </LinkButton>
          <div class="divider" />
          <CompactButton
            icon="i-celeste-edit-line"
            size="lg"
            variant="ghost"
            @click="startEdit"
          />
          <CompactButton
            icon="i-celeste-delete-bin-line"
            size="lg"
            variant="ghost"
            @click="removeLink"
          />
        </div>
      </template>
    </div>
  </BubbleMenu>
</template>

<style scoped lang="scss">
.link-bubble {
  position: fixed;
  padding: var(--spacing-12);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-white-0);
  z-index: 1000;
  box-shadow: var(--shadow-regular-xs);

  .set-mode {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);

    .set-link {
      display: flex;
      gap: var(--spacing-8);
    }

    :deep(.celeste-switch[aria-checked='true']) {
      background-color: var(--color-neutral-700);
    }

    .switch-button-box {
      display: flex;
      align-items: center;
      gap: var(--spacing-8);
    }
  }

  .edit-mode {
    display: flex;
    align-items: center;
    gap: var(--spacing-8);

    .divider {
      width: 1px;
      height: 16px;
      margin: 0 3px;
      background: var(--color-stroke-soft-200);
    }

    & :deep(.celeste-link-button) {
      display: flex;
      border-radius: var(--radius-8);
      color: var(--color-neutral-700);
      gap: var(--spacing-8);
    }
  }
}
</style>
