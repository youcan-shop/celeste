import tinycolor from 'tinycolor2';
import { computed, type WritableComputedRef } from 'vue';

type TinyColorFormat = 'hex8' | 'hex' | 'rgb' | 'hsv' | 'hsl';

export interface useTinyColorModelProps {
  modelValue?: tinycolor.ColorInput;
}

export const ColorPickerEmits = ['update:modelValue'];

export function defineColorModel(props: useTinyColorModelProps, emit: any): WritableComputedRef<tinycolor.Instance, tinycolor.ColorInput> {
  let originalFormat: TinyColorFormat;

  const tinyColorRef = computed({
    get: () => {
      const colorInput = props.modelValue;
      const value = tinycolor(colorInput);

      originalFormat = value.getFormat() as TinyColorFormat;

      return value;
    },
    set: (newValue: tinycolor.ColorInput) => {
      const newTinyColor = tinycolor(newValue);
      const transformedValue = transformToOriginalInputFormat(
        newTinyColor,
        originalFormat,
      );

      emit('update:modelValue', transformedValue);
    },
  });

  return tinyColorRef;
}

function transformToOriginalInputFormat(color: tinycolor.Instance, originalFormat?: TinyColorFormat): any {
  return color.toString(originalFormat);
}
