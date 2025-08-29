<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import CompactButton from '@/components/button/compact-button.vue';
import clsx from 'clsx';
import { DialogClose as ModalClose, DialogDescription as ModalDescription, DialogTitle as ModalTitle } from 'radix-vue';

const props = withDefaults(defineProps<{
  title: string;
  icon?: string;
  description?: string;
  dismissible?: boolean;
  alignment?: 'horizontal' | 'vertical';
  type?: 'default' | 'success' | 'information' | 'warning' | 'error';
  class?: HTMLAttributes['class'];
}>(), {
  type: 'default',
  alignment: 'horizontal',
  dismissible: true,
});
</script>

<template>
  <div
    :class="clsx('celeste-modal-header', props.class)"
    :data-dismissible="dismissible"
    :data-alignment="alignment"
    :data-type="type"
  >
    <div v-if="icon" class="icon">
      <i :class="icon" />
    </div>
    <div v-if="title || description" class="content">
      <ModalTitle v-if="title" as-child>
        <h2 class="title">
          {{ title }}
        </h2>
      </ModalTitle>
      <ModalDescription v-if="description" as-child>
        <p class="description">
          {{ description }}
        </p>
      </ModalDescription>
    </div>
    <ModalClose v-if="dismissible" as-child>
      <CompactButton
        class="close"
        icon="i-celeste-close-line"
        variant="ghost"
      />
    </ModalClose>
  </div>
</template>

<style scoped lang="scss">
.celeste-modal-header {
  --modal-header-icon-size: 24px;

  display: flex;
  gap: var(--spacing-14);
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--spacing-16);
  border-block-end: 1px solid var(--color-stroke-soft-200);

  .icon {
    display: flex;
    align-items: center;
    color: var(--color-icon-sub-600);

    & > i {
      width: var(--modal-header-icon-size);
      height: var(--modal-header-icon-size);
    }
  }

  .content {
    display: grid;
    gap: var(--spacing-4);
    flex: 2;

    .title,
    .description {
      margin: 0;
    }

    .title {
      color: var(--color-text-strong-950);
      font: var(--label-sm);
    }

    .description {
      color: var(--color-text-sub-600);
      font: var(--paragraph-xs);
    }
  }

  &[data-dismissible='false'] {
    align-items: flex-start;

    .content {
      .title {
        align-items: stretch;
        font: var(--label-md);
      }

      .description {
        font: var(--paragraph-sm);
      }
    }
  }

  &[data-alignment='vertical'] {
    flex-direction: column;
    align-items: center;

    .content {
      text-align: center;
    }

    .close {
      position: absolute;
      inset-inline-end: var(--spacing-16);
    }
  }

  &:has(.description) {
    --modal-header-icon-size: 20px;

    .icon {
      padding: var(--spacing-10);
      border: 1px solid transparent;
      border-radius: var(--radius-full);
    }

    &[data-dismissible='false'] .icon {
      padding: var(--spacing-8);
      border-radius: var(--radius-10);
    }

    &[data-type='default'] .icon {
      border-color: var(--color-stroke-soft-200);
    }

    &[data-type='success'] .icon {
      background: var(--color-state-success-lighter);
      color: var(--color-state-success-base);
    }

    &[data-type='information'] .icon {
      background: var(--color-state-information-lighter);
      color: var(--color-state-information-base);
    }

    &[data-type='warning'] .icon {
      background: var(--color-state-warning-lighter);
      color: var(--color-state-warning-base);
    }

    &[data-type='error'] .icon {
      background: var(--color-state-error-lighter);
      color: var(--color-state-error-base);
    }
  }
}
</style>
