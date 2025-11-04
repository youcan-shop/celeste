<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Sheet, SheetContent } from '@/components/sheet';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from '@/composables/use-sidebar';
import clsx from 'clsx';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
});

const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
</script>

<script lang="ts">
export interface SidebarProps {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  class?: HTMLAttributes['class'];
}
</script>

<template>
  <Sheet
    v-if="isMobile"
    :open="openMobile"
    v-bind="$attrs"
    @update:open="setOpenMobile"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      class="celeste-sidebar-mobile"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <div class="celeste-sidebar-mobile-content">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="celeste-sidebar-desktop"
    :data-state="collapsible === 'none' ? undefined : state"
    :data-collapsible="state === 'collapsed' && collapsible !== 'none' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <div
      :class="clsx(
        'celeste-sidebar-gap',
        `celeste-sidebar-gap-variant-${variant}`,
      )"
    />
    <div
      :class="clsx(
        'celeste-sidebar-container',
        `celeste-sidebar-container-side-${side}`,
        `celeste-sidebar-container-variant-${variant}`,
        collapsible === 'none' && 'celeste-sidebar-container-collapsible-none',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div data-sidebar="sidebar" class="celeste-sidebar-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css">
.celeste-sidebar-static {
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  gap: var(--spacing-8);
  width: var(--sidebar-width);
  height: 100svh;
  padding: var(--spacing-8);
  overflow-y: auto;
  background-color: var(--sidebar-background);
  color: var(--sidebar-foreground);
}

.celeste-sidebar-mobile {
  width: var(--sidebar-width);
  padding: 0;
  background-color: var(--sidebar-background);
  color: var(--sidebar-foreground);
}

.celeste-sidebar-mobile > .celeste-sheet-close {
  display: none;
}

.celeste-sidebar-mobile-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.celeste-sidebar-desktop {
  display: none;
}

@media (width >= 768px) {
  .celeste-sidebar-desktop {
    display: block;
  }
}

.celeste-sidebar-gap {
  position: relative;
  width: var(--sidebar-width);
  height: 100svh;
  transition: width var(--animation-fast) linear;
  background-color: transparent;
}

.celeste-sidebar-desktop[data-collapsible='offcanvas'] .celeste-sidebar-gap {
  width: 0;
}

.celeste-sidebar-desktop[data-side='right'] .celeste-sidebar-gap {
  transform: rotate(180deg);
}

.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-gap-variant-floating,
.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-gap-variant-inset {
  width: calc(var(--sidebar-width-icon) + 18px);
}

.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-gap-variant-sidebar {
  width: var(--sidebar-width-icon);
}

.celeste-sidebar-container {
  display: none;
  position: fixed;
  inset-block: 0;
  z-index: 10;
  width: var(--sidebar-width);
  height: 100svh;
  transition:
    left var(--animation-fast) linear,
    right var(--animation-fast) linear,
    width var(--animation-fast) linear;
}

@media (width >= 768px) {
  .celeste-sidebar-container {
    display: flex;
  }
}

.celeste-sidebar-container-side-left {
  left: 0;
}

.celeste-sidebar-desktop[data-collapsible='offcanvas'] .celeste-sidebar-container-side-left {
  left: calc(var(--sidebar-width) * -1);
}

.celeste-sidebar-container-side-right {
  right: 0;
}

.celeste-sidebar-desktop[data-collapsible='offcanvas'] .celeste-sidebar-container-side-right {
  right: calc(var(--sidebar-width) * -1);
}

.celeste-sidebar-container-variant-floating,
.celeste-sidebar-container-variant-inset {
  padding: var(--spacing-8);
}

.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-container-variant-floating,
.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-container-variant-inset {
  width: calc(var(--sidebar-width-icon) + 18px + 2px);
}

.celeste-sidebar-desktop[data-collapsible='icon'] .celeste-sidebar-container-variant-sidebar {
  width: var(--sidebar-width-icon);
}

.celeste-sidebar-desktop[data-side='left'] .celeste-sidebar-container-variant-sidebar {
  border-right: 1px solid var(--sidebar-border);
}

.celeste-sidebar-desktop[data-side='right'] .celeste-sidebar-container-variant-sidebar {
  border-left: 1px solid var(--sidebar-border);
}

.celeste-sidebar-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--sidebar-background);
  color: var(--sidebar-foreground);
}

.celeste-sidebar-desktop[data-variant='floating'] .celeste-sidebar-inner {
  border: 1px solid var(--sidebar-border);
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-regular-md);
}
</style>
