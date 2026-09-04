import type { MaybeElement } from '@vueuse/core';
import type { Ref } from 'vue';
import { unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core';
import { ref, shallowRef } from 'vue';

export interface TabIndicator {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TabObserver {
  listRef: Ref<MaybeElement>;
  indicator: Ref<TabIndicator>;
  ready: Ref<boolean>;
}

export function useTabObserver(activeSelector: string): TabObserver {
  const listRef = shallowRef<MaybeElement>(null);
  const indicator = ref<TabIndicator>({ left: 0, top: 0, width: 0, height: 0 });
  const ready = ref(false);

  function update(): void {
    const active = unrefElement(listRef)?.querySelector<HTMLElement>(activeSelector);
    if (!active) {
      ready.value = false;
      return;
    }

    indicator.value = {
      left: active.offsetLeft,
      top: active.offsetTop,
      width: active.offsetWidth,
      height: active.offsetHeight,
    };

    if (!ready.value)
      requestAnimationFrame(() => requestAnimationFrame(() => ready.value = true));
  }

  useResizeObserver(listRef, update);
  useMutationObserver(listRef, update, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['data-state'],
  });

  return { listRef, indicator, ready };
}
