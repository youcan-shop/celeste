<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import CompactButton from '../button/compact-button.vue';

const props = withDefaults(defineProps<FileUploadOutputProps>(), {
  size: 'sm',
  color: 'yellow',
});

const emits = defineEmits(['remove']);
</script>

<script lang="ts">
interface FileUploadOutputProps extends /* @vue-ignore */ HTMLAttributes {
  files: File[];
  size?: 'sm' | 'xs';
  color?: 'red' | 'orange' | 'yellow' | 'gree' | 'sky' | 'blue' | 'purple' | 'pink' | 'gray';
}
</script>

<template>
  <div
    v-if="files && files.length > 0"
    v-bind="props"
    :class="clsx('celeste-file-upload-output', props.class)"
  >
    <div
      v-for="(file, index) in files"
      :key="index"
      class="celeste-file-upload-output-item"
    >
      <div class="item-icon">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 39.25H10C7.10051 39.25 4.75 36.8995 4.75 34V6C4.75 3.10051 7.10051 0.75 10 0.75H20.5147C21.9071 0.75 23.2425 1.30312 24.227 2.28769L33.7123 11.773C34.6969 12.7575 35.25 14.0929 35.25 15.4853V34C35.25 36.8995 32.8995 39.25 30 39.25Z"
            stroke-width="1.5"
          />
          <path
            d="M23 1V9C23 11.2091 24.7909 13 27 13H35"
            stroke-width="1.5"
          />
          <foreignObject
            x="0"
            y="0"
            width="40"
            height="40"
          >
            <div xmlns="http://www.w3.org/1999/xhtml" class="absolute bottom-1.5 left-0 flex h-4 items-center rounded px-[3px] py-0.5 text-[11px] font-semibold leading-none text-static-white bg-error-base">
              {{ file.type.split("/").at(-1) }}
            </div>
          </foreignObject>
        </svg>
      </div>
      <div class="item-content">
        <div class="info">
          <span class="name">{{ file.name }}</span>
          <span class="size">{{ (file.size / 1024).toFixed(2) }} KB</span>
        </div>
        <CompactButton
          icon="i-celeste-delete-bin-line"
          variant="ghost"
          aria-label="remove"
          class="action"
          @click="emits('remove', index)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.celeste-file-upload-output {
  display: grid;
  width: 400px;
  gap: var(--spacing-16);

  &[size='sm'] {
    --file-icon-size: 40px;
  }

  &[size='xs'] {
    --file-icon-size: 32px;
  }

  &[color='red'] {
    --file-icon-color: var(--color-state-error-base);
  }

  &[color='orange'] {
    --file-icon-color: var(--color-state-warning-base);
  }

  &[color='yellow'] {
    --file-icon-color: var(--color-state-away-base);
  }

  &[color='green'] {
    --file-icon-color: var(--color-state-success-base);
  }

  &[color='teal'] {
    --fil-icon-color: var(--color-state-verified-base);
  }

  &[color='blue'] {
    --file-icon-color: var(--color-state-information-base);
  }

  &[color='purple'] {
    --file-icon-color: var(--color-state-features-base);
  }

  &[color='pink'] {
    --file-icon-color: var(--color-state-highlighted-base);
  }

  &[color='gray'] {
    --file-icon-color: var(--color-state-faced-base);
  }

  .celeste-file-upload-output-item {
    display: flex;
    padding: var(--spacing-16);
    padding-inline-start: var(--spacing-14);
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-12);
    background-color: var(--color-bg-white-0);
    gap: var(--spacing-16);

    .item-icon {
      position: relative;
      flex-shrink: 0;

      & > svg {
        width: var(--file-icon-size);
        height: var(--file-icon-size);

        path:first-child {
          stroke: var(--color-stroke-sub-300);
          fill: var(--color-bg-white-0);
        }

        path:nth-child(2) {
          stroke: var(--color-stroke-sub-300);
        }

        foreignObject {
          div {
            display: flex;
            position: absolute;
            align-items: center;
            height: var(--spacing-16);
            padding-inline: 3px;
            border-radius: var(--radius-4);
            background-color: var(--file-icon-color);
            color: var(--color-static-white);
            font: var(--subheading-xxs);
            inset-block-end: var(--spacing-6);
            inset-inline-start: var(--spacing-0);
            text-transform: uppercase;
          }
        }
      }
    }

    .item-content {
      display: flex;
      flex: 2;
      justify-content: space-between;

      .info {
        display: grid;
        gap: var(--spacing-4);

        .name {
          color: vr(--color-text-strong-950);
          font: var(--label-sm);
        }

        .size {
          color: var(--color-text-sub-600);
          font: var(--paragraph-xs);
        }
      }
    }
  }
}
</style>
