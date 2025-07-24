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
    icon: 'i-celeste-file-copy-line',
  },
  {
    name: 'Cut',
    icon: 'i-celeste-scissors-line',
  },
  {
    name: 'Delete',
    icon: 'i-celeste-delete-bin-4-line',
  },
  {
    name: 'Duplicate',
    icon: 'i-celeste-add-circle-line',
  },
];

function selectedText(editor: Editor) {
  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, '\n');

  return text || null;
}

async function copySelectionToClipboard(editor: Editor) {
  const text = selectedText(editor);

  if (!text) {
    return;
  }

  try {
    if (!window.isSecureContext) {
      throw new Error('Clipboard API is not available in insecure contexts');
    }

    const copyText = await navigator.clipboard.writeText(text);

    return copyText;
  }
  catch (error) {
    console.error(error);
  }
}

async function cutSelection(editor: Editor) {
  await copySelectionToClipboard(editor);
  deleteSelection(editor);
}

function deleteSelection(editor: Editor) {
  return editor.commands.deleteSelection();
}

function duplicateSelection(editor: Editor) {
  const { to } = editor.state.selection;
  const text = selectedText(editor);

  if (!text) {
    return;
  }

  return editor.commands.insertContentAt(to, text);
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
        <Tooltip title="Extra settings" variant="dark">
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
            <i :class="item.icon" />
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
