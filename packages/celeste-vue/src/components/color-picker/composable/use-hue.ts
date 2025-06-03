import tinycolor from 'tinycolor2';
import { ref, type Ref, watch, type WritableComputedRef } from 'vue';

const hueSourceMap = new WeakMap<tinycolor.Instance, boolean>();

interface UseHueRefReturn {
  hueRef: Ref<number>;
  updateHueRef: (newHue: number) => void;
}

export function useHueRef(tinyColorRef: WritableComputedRef<tinycolor.Instance, tinycolor.Instance>): UseHueRefReturn {
  const hueRef = ref(0);

  watch(tinyColorRef, (tinyColorInstance) => {
    if (hueSourceMap.has(tinyColorInstance)) {
      return;
    }

    const newHue = tinyColorInstance.toHsl().h;
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

    hueSourceMap.set(newColorInstance, true);
    tinyColorRef.value = newColorInstance;

    hueRef.value = newHue;
  };

  return { hueRef, updateHueRef };
}
