<script setup lang="ts">
import type { TooltipContentProps, TooltipRootEmits, TooltipRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'reka-ui';
import { ref } from 'vue';
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger } from '.';

export interface TooltipProps extends TooltipRootProps, TooltipContentProps {
  class?: HTMLAttributes['class'];
  size?: 'xs' | 'sm' | 'md';
  variant?: 'light' | 'dark';
  icon?: string;
  title?: string;
  description?: string;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  sideOffset: 12,
  variant: 'light',
  size: 'sm',
});

const emits = defineEmits<TooltipRootEmits>();

const delegatedProps = useDelegatedProps(props, ['class', 'size', 'variant', 'icon', 'title', 'description', 'dismissible']);
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const isOpen = ref(props.defaultOpen);

function close() {
  isOpen.value = false;
}
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot
      v-bind="forwarded"
      :open="props.open || isOpen"
      @update:open="(state) => isOpen = state"
    >
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent
        v-bind="forwarded"
        :size="size"
        :variant="variant"
        :class="props.class"
        :icon="icon"
        :title="title"
        :description="description"
        :dismissible="dismissible"
        :on-dismiss="close"
      />
    </TooltipRoot>
  </TooltipProvider>
</template>
