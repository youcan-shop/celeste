import type { Direction } from 'reka-ui';
import type { Ref } from 'vue';
import { getCurrentInstance, onMounted, ref, watch } from 'vue';

const revision = ref(0);

let observer: MutationObserver | undefined;

function observeDocument(): void {
  if (observer || typeof document === 'undefined')
    return;

  observer = new MutationObserver(() => revision.value++);
  observer.observe(document.documentElement, { attributeFilter: ['dir'], subtree: true });
}

function documentDirection(): Direction {
  return typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
}

export function useDirection(): Ref<Direction> {
  const instance = getCurrentInstance();
  const direction = ref<Direction>(documentDirection());

  observeDocument();

  function read(): void {
    const node = instance?.vnode.el as Node | null | undefined;
    const element = node instanceof HTMLElement ? node : node?.parentElement;

    direction.value = element
      ? getComputedStyle(element).direction === 'rtl' ? 'rtl' : 'ltr'
      : documentDirection();
  }

  onMounted(read);
  watch(revision, read);

  return direction;
}
