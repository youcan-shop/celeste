import type { Ref } from 'vue';
import { useMutationObserver, useResizeObserver } from '@vueuse/core';
import { onMounted, ref, shallowRef } from 'vue';

export interface TabIndicator {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TabObserver {
  listRef: Ref<HTMLElement | { $el: HTMLElement } | null>;
  indicator: Ref<TabIndicator>;
  ready: Ref<boolean>;
}

export function useTabObserver(activeSelector: string): TabObserver {
  const listRef = shallowRef<HTMLElement | { $el: HTMLElement } | null>(null);
  const indicator = ref<TabIndicator>({ left: 0, top: 0, width: 0, height: 0 });
  const ready = ref(false);

  const element = (): HTMLElement | null => {
    const value = listRef.value;
    return (value && '$el' in value ? value.$el : value) as HTMLElement | null;
  };

  function update(): void {
    const active = element()?.querySelector<HTMLElement>(activeSelector);
    if (!active) {
      ready.value = false;
      return;
    }

    const next = {
      left: active.offsetLeft,
      top: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
    };
    const current = indicator.value;
    const moved = next.left !== current.left || next.top !== current.top
      || next.width !== current.width || next.height !== current.height;

    if (moved)
      indicator.value = next;

    if (!ready.value)
      requestAnimationFrame(() => requestAnimationFrame(() => ready.value = true));
  }

  useResizeObserver(element, update);
  useMutationObserver(element, update, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-state'],
  });

  onMounted(update);

  return { listRef, indicator, ready };
}
