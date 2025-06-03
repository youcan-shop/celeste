import tinycolor from 'tinycolor2';
import { computed, nextTick, ref, type WritableComputedRef } from 'vue';

type TinyColorFormat = 'hex' | 'rgb' | 'hsv' | 'hsl';

function transformToOriginalInputFormat(color: tinycolor.Instance, originalFormat?: TinyColorFormat): any {
  return color.toString(originalFormat);
}

export interface useTinyColorModelProps {
  modelValue?: tinycolor.ColorInput;
}

export const ColorPickerEmits = ['update:modelValue'];

export function defineColorModel(props: useTinyColorModelProps, emit: any): WritableComputedRef<tinycolor.Instance, tinycolor.ColorInput> {
  let originalFormat: TinyColorFormat;
  let isInternalUpdate = false;

  const internalColor = ref<tinycolor.Instance | null>(null);

  const tinyColorRef = computed({
    get: () => {
      if (isInternalUpdate && internalColor.value) {
        return internalColor.value;
      }

      const colorInput = props.modelValue;
      const value = tinycolor(colorInput);

      originalFormat = value.getFormat() as TinyColorFormat;
      internalColor.value = value;

      return value;
    },
    set: (newValue: tinycolor.ColorInput) => {
      const newTinyColor = tinycolor(newValue);

      internalColor.value = newTinyColor;

      isInternalUpdate = true;

      emit('update:modelValue', transformToOriginalInputFormat(newTinyColor, originalFormat));

      nextTick(() => {
        isInternalUpdate = false;
      });
    },
  });

  return tinyColorRef;
}
