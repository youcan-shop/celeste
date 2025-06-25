<script setup lang="ts">
import { BubbleMenu, type Editor } from '@tiptap/vue-3';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  editor: Editor;
  showSetLinkFromToolbar: boolean;
}>();

const emit = defineEmits(['set-link-closed']);

const href = ref('');
const openInNewTab = ref(false);
const editing = ref(false);
const isTextSelected = () => props.editor.state.selection.from !== props.editor.state.selection.to;
const bubbleRef = ref<HTMLElement | null>(null);

async function startEdit() {
  editing.value = true;

  const attrs = props.editor.getAttributes('link');
  href.value = attrs.href || '';
  openInNewTab.value = attrs.target === '_blank';
}

function applyLink() {
  if (!href.value)
    return;

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
    ref="bubbleRef"
    :should-show="showBubble"
    :editor="editor"
    :tippy-options="{ placement: 'bottom', duration: 100, offset: [0, 12], onClickOutside: reset }"
    class="link-bubble set-link-bubble"
  >
    <template v-if="editing || (props.showSetLinkFromToolbar && isTextSelected())">
      <div class="link-bubble-content">
        <input
          v-model="href"
          type="url"
          placeholder="Paste or type a link"
          class="link-input"
          @keydown.enter="applyLink"
          @keydown.esc="cancelEdit"
        >
        <label>
          <input v-model="openInNewTab" type="checkbox">
          Open in new tab
        </label>
        <div class="bubble-actions">
          <button @click="applyLink">
            Apply
          </button>
          <button @click="cancelEdit">
            Cancel
          </button>
          <button v-if="editor.isActive('link')" @click="removeLink">
            Remove
          </button>
        </div>
      </div>
    </template>

    <template v-else-if="props.editor.isActive('link')">
      <div class="link-view-mode">
        <a
          :href="editor.getAttributes('link').href"
          target="_blank"
        >
          {{ editor.getAttributes('link').href }}
        </a>
        <button title="Edit" @click="startEdit">
          ✏️
        </button>
        <button title="Remove" @click="removeLink">
          🗑️
        </button>
      </div>
    </template>
  </BubbleMenu>
</template>

<style scoped>
.link-bubble {
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.link-bubble-content input.link-input {
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 0.5rem;
}
.bubble-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
