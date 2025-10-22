<script setup lang="ts">
import Button from '@/components/button/button.vue';
import { useDropZone } from '@vueuse/core';
import clsx from 'clsx';
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

const props = withDefaults(defineProps<FileUploadProps>(), {
  icon: 'i-celeste-upload-cloud-2-line',
  label: 'Choose a file or drag & drop it here.',
  description: 'JPEG, PNG, PDF, and MP4 formats, up to 50 MB.',
  triggerLabel: 'Browse Files',
  labelOnDrop: 'Drop file to upload',
  multiple: false,
  maxSize: 2000,
  maxFiles: 5,
  showPreview: false,
});

const emit = defineEmits<FileUploadAreaEmit>();

const files = defineModel<File[]>({ default: [] });

const dropZoneRef = useTemplateRef<HTMLElement>('dropZoneRef');
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop });

function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const newFiles = Array.from(input.files ?? []);

  const filesToProcess = newFiles.slice(0, props.maxFiles);
  const rejectedFiles = newFiles.slice(props.maxFiles);

  if (rejectedFiles.length > 0) {
    emit('error', {
      message: 'Files exceeded upload limit',
      type: 'count',
      files: rejectedFiles,
    });
  }

  const validFiles = filesToProcess.filter(isValidFile);

  files.value = [...validFiles];
}

function onDrop(droppedFiles: File[] | null) {
  if (!droppedFiles?.length)
    return;

  const filesToProcess = droppedFiles.slice(0, props.maxFiles);
  const rejectedFiles = droppedFiles.slice(props.maxFiles);

  if (rejectedFiles.length > 0) {
    emit('error', {
      message: 'Files exceeded upload limit',
      type: 'count',
      files: rejectedFiles,
    });
  }

  const validFiles = filesToProcess.filter(isValidFile);
  files.value = [...validFiles];
}

function isValidFile(file: File): boolean {
  const maxBytes = props.maxSize * 1024;

  if (file.size > maxBytes) {
    emit('error', {
      message: `File too large: ${file.name}`,
      type: 'size',
      files: [file],
    });

    return false;
  }

  const acceptableTypes = props.accept?.split(',') ?? [];

  if (acceptableTypes.length > 0 && !acceptableTypes.includes(file.type)) {
    emit('error', {
      message: 'Unsupported type',
      type: 'type',
      files: [file],
    });

    return false;
  }

  return true;
}

function handleTriggerClick(e: Event) {
  if (props.onTriggerClick) {
    e.preventDefault();
    props.onTriggerClick();
  }
}
</script>

<script lang="ts">
export interface FileUploadProps {
  label?: string;
  description?: string;
  labelOnDrop?: string;
  triggerLabel?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  icon?: string;
  accept?: InputHTMLAttributes['accept'];
  onTriggerClick?: () => void;
  class?: InputHTMLAttributes['class'];
}

export interface FileError {
  message: string;
  type: 'size' | 'type' | 'count';
  files: File[];
}

export interface FileUploadAreaEmit {
  error: [error: FileError];
}
</script>

<template>
  <label
    ref="dropZoneRef"
    :class="clsx(
      'celeste-file-upload-area',
      props.class,
    )"
    :data-over-drop-zone="isOverDropZone"
  >
    <i :class="icon" />
    <div class="celeste-file-upload-area-content">
      <span class="celeste-file-upload-area-label">
        {{ isOverDropZone ? labelOnDrop : label }}
      </span>
      <span
        v-if="!isOverDropZone"
        class="celeste-file-upload-area-description"
      >
        {{ description }}
      </span>
    </div>
    <Button
      v-if="!isOverDropZone"
      as-child
      intent="neutral"
      variant="stroke"
      size="xs"
      class="celeste-file-upload-area-trigger"
      @click="handleTriggerClick"
    >
      <span>{{ triggerLabel }}</span>
    </Button>
    <input
      v-bind="$attrs"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="handleUpload"
    >
  </label>
</template>

<style scoped lang="scss">
.celeste-file-upload-area {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 204px;
  gap: calc(var(--spacing-10) * 2);
  padding: calc(var(--spacing-16) * 2);
  transition: background-color var(--animation-normal) ease-out;
  border: 1px dashed var(--color-stroke-sub-300);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-white-0);
  cursor: pointer;

  &:hover {
    background-color: var(--color-bg-weak-50);
  }

  & > i {
    width: 24px;
    height: 24px;
    color: var(--color-icon-sub-600);
  }

  .celeste-file-upload-area-content {
    display: grid;
    gap: var(--spacing-6);
    text-align: center;

    .celeste-file-upload-area-label {
      color: var(--color-text-strong-950);
      font: var(--label-sm);
    }

    .celeste-file-upload-area-description {
      color: var(--color-text-sub-600);
      font: var(--label-xs);
    }
  }

  .celeste-file-upload-area-trigger {
    background-color: var(--color-bg-white-0) !important;

    &:hover {
      background-color: transparent !important;
      box-shadow: none !important;
    }
  }

  & > input[type='file'] {
    position: absolute;
    opacity: 0;
    scale: 0;
  }

  &[data-over-drop-zone='true'] {
    background-color: var(--color-bg-weak-50);
  }
}
</style>
