import tinycolor from 'tinycolor2';
import { computed, type WritableComputedRef } from 'vue';

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

  function updateColor(value: tinycolor.ColorInput): void {
    const newValue = tinycolor(value);
    // if (Object.prototype.hasOwnProperty.call(props, 'tinyColor')) {
    //   emit('update:tinyColor', newValue);
    // }
    // if (Object.prototype.hasOwnProperty.call(props, 'modelValue')) {
    //   emit('update:modelValue', transformToOriginalInputFormat(newValue, originalFormat, isObjectOriginally));
    // }
    emit('update:modelValue', transformToOriginalInputFormat(newValue, originalFormat));
  };

  const tinyColorRef = computed({
    get: () => {
      const colorInput = props.modelValue;
      const value = tinycolor(colorInput);

      originalFormat = value.getFormat() as TinyColorFormat;

      return value;
    },
    set: (newValue: tinycolor.ColorInput) => {
      updateColor(newValue);
    },
  });

  return tinyColorRef;
}
