<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import CompactButton from '@/components/button/compact-button.vue';
import SelectContent from '@/components/select/select-content.vue';
import SelectIcon from '@/components/select/select-icon.vue';
import SelectItem from '@/components/select/select-item.vue';
import SelectTrigger from '@/components/select/select-trigger.vue';
import Select from '@/components/select/select.vue';
import Tooltip from '@/components/tooltip/tooltip.vue';
import { ref } from 'vue';

const props = defineProps<{
  editor: Editor;
}>();

const defaultValue = ref('');
const extraSettings = [
  {
    name: 'Copy',
    icon: 'file-copy-line',
  },
  {
    name: 'Cut',
    icon: 'scissors-line',
  },
  {
    name: 'Delete',
    icon: 'delete-bin-4-line',
  },
  {
    name: 'Duplicate',
    icon: 'add-circle-line',
  },
];

function selectedText(editor: Editor) {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, '\n');

  if (!text) {
    return null;
  };

  return text;
}

async function copySelectionToClipboard(editor: Editor) {
  const el = document.createElement('textarea');

  if (!selectedText(editor)) {
    return;
  }

  el.value = selectedText(editor) as string;
  el.style.opacity = '0';
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy'); // using this method because the trigger context is indirect (navigator.clipboard) will not work
  document.body.removeChild(el);
}

function cutSelection(editor: Editor) {
  copySelectionToClipboard(editor);
  deleteSelection(editor);
}

function deleteSelection(editor: Editor) {
  return editor.commands.deleteSelection();
}

function duplicateSelection(editor: Editor) {
  const { to } = editor.state.selection;

  if (!selectedText(editor)) {
    return;
  }

  return editor.commands.insertContentAt(to, selectedText(editor));
}

function clearSelectedValue() {
  defaultValue.value = '';
}

function onActionClick(name: string, editor: Editor) {
  switch (name) {
    case 'Copy':
      copySelectionToClipboard(editor);
      break;
    case 'Cut':
      cutSelection(editor);
      break;
    case 'Delete':
      deleteSelection(editor);
      break;
    case 'Duplicate':
      duplicateSelection(editor);
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="show-more-wrapper">
    <Select
      v-model="defaultValue"
      @update:model-value="onActionClick($event, props.editor)"
      @update:open="clearSelectedValue"
    >
      <SelectTrigger variant="inline">
        <Tooltip title="Extra settings">
          <CompactButton
            icon="i-celeste-more-2-line"
            variant="ghost"
          />
        </Tooltip>
      </SelectTrigger>
      <SelectContent align="end" width="fit">
        <SelectItem
          v-for="(item, index) in extraSettings"
          :key="index"
          :value="item.name"
        >
          <SelectIcon>
            <i :class="`i-celeste-${item.icon}`" />
          </SelectIcon>
          <span>{{ item.name }}</span>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<style scoped lang="scss">
.show-more-wrapper {
  :deep(.i-celeste-arrow-down-s-line) {
    display: none;
  }
}

.celeste-select-item[data-state='checked'] {
  &:deep(.i-celeste-check-line) {
    display: none;
  }
}
</style>
