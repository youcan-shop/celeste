import tinycolor from 'tinycolor2';
import { ref, type Ref, watch, type WritableComputedRef } from 'vue';

interface UseHueRefReturn {
  hueRef: Ref<number>;
  updateHueRef: (newHue: number) => void;
}

export function useHueRef(tinyColorRef: WritableComputedRef<tinycolor.Instance, tinycolor.Instance>): UseHueRefReturn {
  const hueRef = ref(0);

  hueRef.value = tinyColorRef.value.toHsl().h;

  watch(tinyColorRef, (tinyColorInstance) => {
    const newHue = tinyColorInstance.toHsl().h;

    // Preserve hue when color becomes grayscale
    if (newHue === 0 && hueRef.value !== 0) {
      return;
    }

    hueRef.value = newHue;
  }, { immediate: true });

  const updateHueRef = (newHue: number): any => {
    const newColorInstance = tinycolor({
      ...tinyColorRef.value.toHsl(),
      h: newHue,
    });

    tinyColorRef.value = newColorInstance;
    hueRef.value = newHue;
  };

  return { hueRef, updateHueRef };
}
