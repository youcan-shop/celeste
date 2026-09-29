<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { DrawerClose } from 'reka-ui';
import CompactButton from '@/components/button/compact-button.vue';
import DrawerDescription from './drawer-description.vue';
import DrawerTitle from './drawer-title.vue';

export interface DrawerHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  dismissible?: boolean;
  divider?: boolean;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<DrawerHeaderProps>(), {
  dismissible: true,
});
</script>

<template>
  <div
    :class="clsx('celeste-drawer-header', props.class)"
    :data-size="description ? 'lg' : 'sm'"
    :data-divider="divider"
  >
    <span v-if="icon" class="icon">
      <i :class="icon" />
    </span>
    <div class="content">
      <DrawerTitle>{{ title }}</DrawerTitle>
      <DrawerDescription v-if="description">
        {{ description }}
      </DrawerDescription>
      <slot />
    </div>
    <slot name="actions" />
    <DrawerClose v-if="dismissible" as-child>
      <CompactButton
        icon="i-celeste-close-line"
        variant="ghost"
        size="lg"
      />
    </DrawerClose>
  </div>
</template>

<style scoped>
.celeste-drawer-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: var(--spacing-20);
  gap: var(--spacing-12);

  &[data-size='lg'] {
    align-items: flex-start;
    gap: var(--spacing-16);
  }

  &[data-divider='true'] {
    border-bottom: 1px solid var(--color-stroke-soft-200);
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    color: var(--color-text-sub-600);

    i {
      width: 24px;
      height: 24px;
    }
  }

  &[data-size='lg'] .icon {
    padding: var(--spacing-12);
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-full);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
    gap: var(--spacing-4);
  }
}
</style>
