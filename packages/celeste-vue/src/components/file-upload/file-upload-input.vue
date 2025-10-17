<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import clsx from 'clsx';
import { type InputHTMLAttributes, ref, useTemplateRef } from 'vue';
import Button from '../button/button.vue';
import FileUploadOutput from './file-upload-output.vue';

interface FileState {
  name?: string;
  size?: number;
  type?: string;
  output?: string;
  error?: string;
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  icon: 'i-celeste-upload-cloud-2-line',
  label: 'Choose a file or drag & drop it here.',
  labelOnDrop: 'Drop file to upload',
  maxSize: 2000,
  accept: () => ['png'],
  showPreview: false,
});

const filos = ref<File[] | null>();
const file = ref<FileState>({});

function validateFile(f: File): boolean {
  const maxBytes = props.maxSize * 1024;
  const extension = f.type.split('/')[1];

  if (!props.accept.includes('*') && !props.accept.includes(extension as AcceptType)) {
    file.value.error = `Only ${props.accept.join(', ').toUpperCase()} files are allowed.`;
    return false;
  }

  if (f.size > maxBytes) {
    file.value.error = `File size exceeds ${(props.maxSize / 1024).toFixed(2)}MB.`;
    return false;
  }

  file.value.error = undefined;
  return true;
}

function readFile(f: File) {
  if (!validateFile(f))
    return;

  const reader = new FileReader();
  reader.onload = () => {
    file.value = {
      name: f.name,
      type: f.type,
      size: f.size,
      output: reader.result as string,
      error: undefined,
    };
  };
  reader.readAsDataURL(f);
}

function handleFiles(files: File[] | null) {
  if (!files?.length)
    return;
  readFile(files[0]);
  filos.value = files;
}

function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  handleFiles([...(input.files ?? [])]);
}

function handleRemove(index: number) {
  filos.value = filos.value?.filter((_, i) => i !== index);
}

function onDrop(files: File[] | null) {
  handleFiles(files);
}

const dropZoneRef = useTemplateRef<HTMLElement>('dropZoneRef');
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop });
</script>

<script lang="ts">
interface FileUploadProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'type' | 'accept'> {
  label?: string;
  labelOnDrop?: string;
  icon?: string;
  maxSize?: number;
  accept?: AcceptType[];
  showPreview?: boolean;
}

type AcceptType = '*' | 'jpg' | 'jpeg' | 'png' | 'gif' | 'svg' | 'webp' | 'avif';
</script>

<template>
  <label
    ref="dropZoneRef"
    :data-on-drop="isOverDropZone"
    :class="clsx('celeste-file-upload-input-wrapper', props.class)"
  >
    <div class="celeste-file-upload-input">
      <i :class="icon" />
      <div class="celeste-file-upload-content">
        <span class="celeste-file-upload-label">
          {{ isOverDropZone ? labelOnDrop : label }}
        </span>
        <span
          v-if="$slots.description && !isOverDropZone"
          class="celeste-file-upload-accepts"
        >
          <slot name="description" />
        </span>
      </div>
      <input
        v-bind="$attrs"
        type="file"
        multiple
        :accept="props.accept.map(extension => `image/${extension}`).join(',')"
        @change="handleUpload"
      >
      <Button
        v-if="$slots.trigger && !isOverDropZone"
        as-child
        intent="neutral"
        variant="stroke"
        size="xs"
        class="celeste-file-upload-action"
      >
        <span><slot name="trigger" /></span>
      </Button>

      <div
        v-if="showPreview && !isOverDropZone && file.output"
        class="celeste-file-upload-output"
        :style="{ 'background-image': `url(${file.output})` }"
      >
        <Button
          v-if="$slots.changeButton"
          as-child
          intent="neutral"
          variant="stroke"
          size="xs"
          class="celeste-file-upload-trigger"
        >
          <span><slot name="changeButton" /></span>
        </Button>
        <span class="celeste-file-upload-name">{{ file.name }}</span>
      </div>
    </div>
  </label>

  <p v-if="file.error" class="celeste-file-upload-error">
    {{ file.error }}
  </p>

  <FileUploadOutput
    v-if="filos"
    :files="filos"
    @remove="handleRemove"
  />
</template>

<style scoped lang="scss">
.celeste-file-upload-input-wrapper {
  width: 400px;
  height: 220px;
  max-height: 220px;
  overflow: hidden;
  transition: background-color var(--animation-normal) ease-out;
  border: 1px dashed var(--color-stroke-sub-300);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-white-0);

  .celeste-file-upload-input {
    display: flex;
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: calc(var(--spacing-48) - var(--spacing-16));
    text-align: center;
    cursor: pointer;
    gap: calc(var(--spacing-16) + var(--spacing-4));

    & > i {
      width: 24px;
      height: 24px;
      color: var(--color-icon-sub-600);
    }

    & > span:last-child {
      background-color: var(--color-bg-white-0) !important;
      pointer-events: none;
    }

    .celeste-file-upload-content {
      display: grid;
      gap: var(--spacing-6);

      .celeste-file-upload-label {
        color: var(--color-text-strong-950);
        font: var(--label-sm);
      }

      .celeste-file-upload-accepts {
        color: var(--color-text-sub-600);
        font: var(--label-xs);
      }
    }

    .celeste-file-upload-action {
      width: fit-content;
    }

    & > input[type='file'] {
      position: absolute;
      opacity: 0;
      scale: 0;
    }

    .celeste-file-upload-output {
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-12);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      inset: var(--spacing-0);

      .celeste-file-upload-name {
        position: absolute;
        width: calc(100% - (var(--spacing-12) * 2));
        overflow: hidden;
        color: var(--color-text-white-0);
        font: var(--paragraph-xs);
        text-align: start;
        text-overflow: ellipsis;
        white-space: nowrap;
        inset-inline-start: var(--spacing-12);
        inset-block-end: var(--spacing-12);
      }

      .celeste-file-upload-trigger {
        display: none;
        position: relative;
        background-color: var(--color-bg-white-0);
      }

      &::before {
        content: '';
        position: absolute;
        background-image: linear-gradient(
          to bottom,
          transparent,
          color-mix(in srgb, var(--color-bg-strong-950) 30%, transparent),
          color-mix(in srgb, var(--color-bg-strong-950) 70%, transparent)
        );
        inset: var(--spacing-0);
      }
    }
  }

  &:has(.celeste-file-upload-output) {
    border-style: solid;
  }

  &:hover,
  &[data-on-drop='true'] {
    background-color: var(--color-bg-weak-50);

    .celeste-file-upload-output {
      .celeste-file-upload-trigger {
        display: flex;
      }

      &::before {
        background-image: linear-gradient(
          to bottom,
          transparent,
          color-mix(in srgb, var(--color-bg-strong-950) 80%, transparent)
        );
      }
    }
  }
}

.celeste-file-upload-error {
  color: var(--color-state-error-base);
  font: var(--label-xs);
}
</style>
