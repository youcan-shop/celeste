import tinycolor from 'tinycolor2';
import { ref, type Ref, type WritableComputedRef } from 'vue';

interface UseHueRefReturn {
  hueRef: Ref<number>;
  updateHueRef: (newHue: number) => void;
}

export function useHueRef(tinyColorRef: WritableComputedRef<tinycolor.Instance, tinycolor.Instance>): UseHueRefReturn {
  const hueRef = ref(0);

  hueRef.value = tinyColorRef.value.toHsl().h;

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
