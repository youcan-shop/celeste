<script setup lang="ts">
import Button from '@/components/button/button.vue';
import CompactButton from '@/components/button/compact-button.vue';
import LinkButton from '@/components/button/link-button.vue';
import Label from '@/components/label/label.vue';
import Switch from '@/components/switch/switch.vue';
import { BubbleMenu, type Editor } from '@tiptap/vue-3';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  editor: Editor;
  showSetLinkFromToolbar: boolean;
}>();

const emit = defineEmits(['set-link-closed']);

const href = ref('');
const openInNewTab = ref(false);
const editing = ref(false);
const isTextSelected = () => props.editor.state.selection.from !== props.editor.state.selection.to;

async function startEdit() {
  editing.value = true;

  const attrs = props.editor.getAttributes('link');
  href.value = attrs.href || '';
  openInNewTab.value = attrs.target === '_blank';
}

function removeLink() {
  props.editor.chain().focus().unsetLink().run();
  reset();
}

function cancelEdit() {
  reset();
}

function reset() {
  editing.value = false;
  href.value = '';
  openInNewTab.value = false;
  emit('set-link-closed');
}

function showBubble() {
  return editing.value
    || props.editor.isActive('link')
    || (props.showSetLinkFromToolbar && isTextSelected());
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

onMounted(() => {
  props.editor.on('selectionUpdate', () => {
    if (props.editor.isActive('link') || props.showSetLinkFromToolbar) {
      const attrs = props.editor.getAttributes('link');
      href.value = attrs.href || '';
      openInNewTab.value = attrs.target === '_blank';
    }
    else {
      reset();
      emit('set-link-closed');
    }
  });
});
</script>

<template>
  <BubbleMenu
    :should-show="showBubble"
    :editor="editor"
    :tippy-options="{
      theme: 'custom',
      placement: 'bottom',
      duration: [200, 200],
      offset: [0, 12],
      onHidden: reset,
    }"
    class="link-bubble"
  >
    <Transition name="fade" mode="out-in">
      <template v-if="editing || (props.showSetLinkFromToolbar && isTextSelected())">
        <div class="set-mode">
          <div class="set-link">
            <input
              v-model="href"
              type="url"
              placeholder="Paste or type a link"
              class="link-input"
              @keydown.enter="applyLink"
              @keydown.esc="cancelEdit"
            >
            <Button
              intent="neutral"
              size="xxs"
              variant="stroke"
              :disabled="!isValidUrl"
              @click="applyLink"
            >
              Set link
            </Button>
          </div>
          <div class="switch-button-box">
            <Label label-text="Open in new tab" />
            <Switch v-model:checked="openInNewTab" />
          </div>
        </div>
      </template>

      <template v-else-if="props.editor.isActive('link')">
        <div class="edit-mode">
          <LinkButton
            :href="editor.getAttributes('link').href"
            :target="editor.getAttributes('link').target"
          >
            <i class="i-celeste-link" />
            <span>{{ truncateMiddleUrl(editor.getAttributes('link').href) }}</span>
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
    </Transition>
  </BubbleMenu>
</template>

<style scoped lang="scss">
.link-bubble {
  padding: var(--spacing-12);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  max-width: 400px;

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
      gap: var(--spacing-8);
      color: var(--color-neutral-700);
      border-radius: var(--radius-8);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all var(--animation-fast) ease-out;
    will-change: opacity, transform;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: scale(0.97) translateY(4px);
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
