<script setup lang="ts">
import type { DrawerRootEmits, DrawerRootProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { DrawerRoot, useForwardPropsEmits } from 'reka-ui';

export type DrawerSide = 'right' | 'left' | 'bottom' | 'top';

export interface DrawerProps extends Omit<DrawerRootProps, 'swipeDirection'> {
  side?: DrawerSide;
}

const props = withDefaults(defineProps<DrawerProps>(), {
  side: 'right',
  open: undefined,
  modal: true,
});

const emits = defineEmits<DrawerRootEmits>();

const directions = { right: 'right', left: 'left', bottom: 'down', top: 'up' } as const;

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'side'), emits);
</script>

<template>
  <DrawerRoot v-bind="forwarded" :swipe-direction="directions[side]">
    <slot />
  </DrawerRoot>
</template>
