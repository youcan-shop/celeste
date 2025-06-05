import { onUnmounted, readonly, ref, type Ref } from 'vue';

export interface UseUserPageSelectReturn {
  isDisabled: Readonly<Ref<boolean, boolean>>;
  togglePageUserSelect: () => void;
  preventPageUserSelect: () => void;
  allowPageUserSelect: () => void;
}

export function useUserPageSelection(): UseUserPageSelectReturn {
  const isDisabled = ref(false);
  let styleElement: HTMLStyleElement | null = null;

  const preventPageUserSelect = (): void => {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.textContent = 'body > * { user-select: none; }';
      document.head.appendChild(styleElement);
      isDisabled.value = true;
    }
  };

  const allowPageUserSelect = (): void => {
    if (styleElement) {
      styleElement.remove();
      styleElement = null;
      isDisabled.value = false;
    }
  };

  const togglePageUserSelect = (): void => {
    if (styleElement) {
      allowPageUserSelect();

      return;
    }

    preventPageUserSelect();
  };

  onUnmounted(() => {
    allowPageUserSelect();
  });

  return {
    isDisabled: readonly(isDisabled),
    togglePageUserSelect,
    preventPageUserSelect,
    allowPageUserSelect,
  };
}
