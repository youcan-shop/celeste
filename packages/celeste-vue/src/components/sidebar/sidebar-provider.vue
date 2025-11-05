<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue';
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from '@/composables/use-sidebar';
import { defaultDocument, useEventListener, useMediaQuery, useVModel } from '@vueuse/core';
import clsx from 'clsx';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  defaultOpen?: boolean;
  open?: boolean;
  class?: HTMLAttributes['class'];
}>(), {
  defaultOpen: !defaultDocument?.cookie.includes(`${SIDEBAR_COOKIE_NAME}=false`),
  open: undefined,
});

const emits = defineEmits<{
  'update:open': [open: boolean];
}>();

const isMobile = useMediaQuery('(max-width: 768px)');
const openMobile = ref(false);

const open = useVModel(props, 'open', emits, {
  defaultValue: props.defaultOpen ?? false,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>;

function setOpen(value: boolean) {
  open.value = value;

  document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
}

function setOpenMobile(value: boolean) {
  openMobile.value = value;
}

function toggleSidebar() {
  return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
}

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    toggleSidebar();
  }
});

const state = computed(() => open.value ? 'expanded' : 'collapsed');

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
});
</script>

<template>
  <div
    :style="{
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    }"
    :class="clsx('celeste-sidebar-provider', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<style lang="css">
  :root {
  --sidebar-background: var(--color-bg-white-0);
  --sidebar-foreground: var(--color-text-sub-600);
  --sidebar-primary: var(--color-primary-base);
  --sidebar-primary-foreground: var(--color-text-white-0);
  --sidebar-accent: var(--color-bg-weak-50);
  --sidebar-accent-foreground: var(--color-text-strong-950);
  --sidebar-border: var(--color-stroke-soft-200);
  --sidebar-ring: var(--shadow-buttons-important-focus);
}

.celeste-sidebar-provider * {
  box-sizing: border-box;
}

.celeste-sidebar-provider {
  display: flex;
  width: 100%;
  min-height: 100svh;
}

.celeste-sidebar-provider:has([data-variant='inset']) {
  background-color: var(--sidebar-background);
}
</style>
