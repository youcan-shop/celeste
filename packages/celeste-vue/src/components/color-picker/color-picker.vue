<script setup lang="ts">
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { bumpColorValue, clamp, COLOR_NUMBER_VALIDATION_PATTERN, type ColorKey, getColorConstraints, HEX_VALIDATION_PATTERN, type HSBKey, type HSLKey, resolveArrowDirection, type RGBKey, truncColorValue } from '@/utils/color';
import { useForwardPropsEmits } from 'radix-vue';
import tinycolor from 'tinycolor2';
import { computed, type HTMLAttributes, ref, watch } from 'vue';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { TextInput } from '../text-input';
import { ColorArea, HueSlider } from './';
import AlphaSlider from './alpha-slider.vue';
import ColorSwatch from './color-swatch.vue';
import { defineColorModel } from './composable/use-color-model';

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: 'hsl(240, 100%, 50%)',
  formats: () => ['hex', 'rgb', 'hsl', 'hsb'],
  label: 'Pick Color',
});

const emit = defineEmits<ColorPickerEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emit);

const tinyColorRef = defineColorModel(props, emit);

const hueRef = ref(tinyColorRef.value.toHsl().h);
const currentColorFormat = ref(props.defaultFormat || 'hex');
const eyeDropper = ref<EyeDropper | null>(null);

const hex = computed({
  get: () => tinyColorRef.value.toHexString().toUpperCase(),
  set: () => {},
});

const rgb = computed(() => {
  return tinyColorRef.value.toRgb();
});

const hsl = computed(() => {
  const { h, s, l } = tinyColorRef.value.toHsl();

  return {
    h: `${h.toFixed()}°`,
    s: `${(s * 100).toFixed()}%`,
    l: `${(l * 100).toFixed()}%`,
    a: tinyColorRef.value.getAlpha(),
  };
});

const hsv = computed(() => {
  const { h, s, v } = tinyColorRef.value.toHsv();
  return {
    h: `${h.toFixed()}°`,
    s: `${(s * 100).toFixed()}%`,
    v: `${(v * 100).toFixed()}%`,
  };
});

watch(tinyColorRef, (tinyColorInstance) => {
  const newHue = tinyColorInstance.toHsl().h;
  const saturation = tinyColorInstance.toHsl().s;

  // Preserve hue when color becomes grayscale (saturation is 0)
  if (saturation === 0 && hueRef.value !== 0) {
    return;
  }

  hueRef.value = newHue;
}, { immediate: true });

if (window.EyeDropper) {
  eyeDropper.value = new window.EyeDropper();
}

function sipColor() {
  if (!eyeDropper.value) {
    return;
  }

  eyeDropper.value.open().then((result: any) => {
    const newColor = tinycolor(result.sRGBHex);
    tinyColorRef.value = newColor;
  }).catch((e: Error) => {
    // Do nothing, this prevents an error from being thrown if the user cancels the color selection.
  });
}

function getCurrentColorValue(key: ColorKey) {
  let currentValue = 0;

  if (key === 'r' || key === 'g' || key === 'b') {
    currentValue = rgb.value[key];
  }
  else if (key === 'h') {
    currentValue = tinyColorRef.value.toHsl().h;
  }
  else if (key === 's' || key === 'l' || key === 'v') {
    if (currentColorFormat.value === 'hsl') {
      const currentHsl = tinyColorRef.value.toHsl();
      currentValue = key === 's' ? currentHsl.s * 100 : currentHsl.l * 100;
    }
    else {
      const currentHsv = tinyColorRef.value.toHsv();
      currentValue = key === 's' ? currentHsv.s * 100 : currentHsv.v * 100;
    }
  }
  else if (key === 'a') {
    currentValue = tinyColorRef.value.getAlpha() * 100;
  }

  return currentValue;
}

function validateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const inputEvent = event as InputEvent;
  const newValue = truncColorValue(input.value) + (inputEvent.data ?? '');

  if (!COLOR_NUMBER_VALIDATION_PATTERN.test(newValue)) {
    event.preventDefault();
  }
}

function validateHexInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const inputEvent = event as InputEvent;
  const newValue = input.value + (inputEvent.data ?? '');

  if (!HEX_VALIDATION_PATTERN.test(newValue)) {
    event.preventDefault();
  }
}

function inputChangeHex(event: Event) {
  const colorInput = (event.target as HTMLInputElement)?.value;

  if (!colorInput) {
    return;
  }

  tinyColorRef.value = tinycolor(colorInput);
}

function inputChangeRGB(event: Event, key: RGBKey) {
  const value = Number((event.target as HTMLInputElement)?.value);
  const currentRgb = rgb.value;
  const newRgb = { ...currentRgb, [key]: value };

  tinyColorRef.value = tinycolor(newRgb);
}

function inputChangeHSL(event: Event, key: HSLKey) {
  const HSLInput = (event.target as HTMLInputElement)?.value;
  let newHSLValue = truncColorValue(HSLInput);

  if (key === 's' || key === 'l') {
    newHSLValue /= 100;
  }

  if (Number.isNaN(newHSLValue)) {
    return;
  }

  const newHSL = { [key]: newHSLValue };

  tinyColorRef.value = {
    ...tinyColorRef.value.toHsl(),
    ...newHSL,
  };
}

function inputChangeHSB(event: Event, key: HSBKey) {
  const HSBInput = (event.target as HTMLInputElement)?.value;
  const HSBValue = truncColorValue(HSBInput);

  if (Number.isNaN(HSBValue)) {
    return;
  }

  const newHSB = { [key]: HSBValue };

  tinyColorRef.value = {
    ...tinyColorRef.value.toHsv(),
    ...newHSB,
  };
}

function inputChangeAlpha(event: Event) {
  const alphaInput = (event.target as HTMLInputElement)?.value;
  const alphaValue = truncColorValue(alphaInput) / 100;

  if (Number.isNaN(alphaValue)) {
    return;
  }

  tinyColorRef.value = tinyColorRef.value.setAlpha(Math.max(0, Math.min(1, alphaValue)));
}

function handleColorValueKeyDown(event: KeyboardEvent, key: ColorKey) {
  const direction = resolveArrowDirection(event);
  const currentValue = getCurrentColorValue(key);
  const { min, max } = getColorConstraints(key);
  const newValue = clamp(bumpColorValue(currentValue, direction), min, max);

  if (key === 'r' || key === 'g' || key === 'b') {
    const newColor = tinycolor({ ...rgb.value, [key]: newValue });
    emit('update:modelValue', newColor.toString());
  }
  else if (key === 'h') {
    if (currentColorFormat.value === 'hsl') {
      const newColor = tinycolor({ ...tinyColorRef.value.toHsl(), h: newValue });
      emit('update:modelValue', newColor.toString());
    }
    else {
      const newColor = tinycolor({ ...tinyColorRef.value.toHsv(), h: newValue });
      emit('update:modelValue', newColor.toString());
    }
  }
  else if (key === 's' || key === 'l' || key === 'v') {
    if (currentColorFormat.value === 'hsl') {
      const newColor = tinycolor({ ...tinyColorRef.value.toHsl(), [key]: newValue / 100 });
      emit('update:modelValue', newColor.toString());
    }
    else {
      const currentHsv = tinyColorRef.value.toHsv();
      const newColor = tinycolor({ ...currentHsv, [key]: newValue / 100 });
      emit('update:modelValue', newColor.toString());
    }
  }
  else if (key === 'a') {
    const newColor = tinyColorRef.value.setAlpha(newValue / 100);
    emit('update:modelValue', newColor.toString());
  }
}
</script>

<script lang="ts">
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsb';

export interface ColorPickerProps {
  modelValue: string | tinycolor.ColorInput;
  label?: string;
  class?: HTMLAttributes['class'];
  formats?: ColorFormat[];
  defaultFormat?: ColorFormat;
}

export interface ColorPickerEmits {
  'update:modelValue': [value: string];
}

interface ColorSelectionOptions {
  signal?: AbortSignal;
}

interface ColorSelectionResult {
  sRGBHex: string;
}

interface EyeDropper {
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>;
}

interface EyeDropperConstructor {
  new (): EyeDropper;
}

declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor | undefined;
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button
        class="celeste-picker-trigger"
        intent="neutral"
        variant="stroke"
      >
        <span class="celeste-selected-color" />
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent :dismissible="false">
      <div class="celeste-color-picker-wrapper" v-bind="forwarded">
        <div class="celeste-color-picker">
          <ColorArea
            v-model="tinyColorRef"
            :hue="hueRef"
          />
          <HueSlider v-model="hueRef" />
          <AlphaSlider v-model="tinyColorRef" />
          <div class="celeste-color-control-panel">
            <Select v-model="currentColorFormat" name="color-format">
              <SelectTrigger variant="inline">
                <SelectValue placeholder="HEX" class="celeste-selected-color-format">
                  {{ currentColorFormat }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent width="fit">
                <SelectItem
                  v-for="format in props.formats"
                  :key="format"
                  :value="format"
                >
                  <span class="celeste-color-format">
                    {{ format }}
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            <div
              class="celeste-color-controls"
            >
              <Button
                v-if="eyeDropper"
                class="celeste-color-sip"
                variant="stroke"
                size="xxs"
                intent="neutral"
                @click="sipColor"
              >
                <i class="i-celeste-sip-line" />
              </Button>
              <div class="celeste-color-format-inputs">
                <template v-if="currentColorFormat === 'hex'">
                  <TextInput
                    v-model="hex"
                    autocomplete="off"
                    name="hex"
                    placeholder="#FFFFFF"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateHexInput"
                    @focusout="inputChangeHex"
                    @keydown.enter.prevent="inputChangeHex"
                  />
                </template>
                <template v-else-if="currentColorFormat === 'rgb'">
                  <TextInput
                    v-model="rgb.r"
                    autocomplete="off"
                    name="red"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeRGB(e, 'r')"
                    @keydown.enter.prevent="e => inputChangeRGB(e, 'r')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'r')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'r')"
                  />
                  <TextInput
                    v-model="rgb.g"
                    autocomplete="off"
                    name="green"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeRGB(e, 'g')"
                    @keydown.enter.prevent="e => inputChangeRGB(e, 'g')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'g')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'g')"
                  />
                  <TextInput
                    v-model="rgb.b"
                    autocomplete="off"
                    name="blue"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeRGB(e, 'b')"
                    @keydown.enter.prevent="e => inputChangeRGB(e, 'b')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'b')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'b')"
                  />
                </template>
                <template v-else-if="currentColorFormat === 'hsl'">
                  <TextInput
                    v-model="hsl.h"
                    autocomplete="off"
                    name="hue"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSL(e, 'h')"
                    @keydown.enter.prevent="e => inputChangeHSL(e, 'h')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'h')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'h')"
                  />
                  <TextInput
                    v-model="hsl.s"
                    autocomplete="off"
                    name="saturation"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSL(e, 's')"
                    @keydown.enter.prevent="e => inputChangeHSL(e, 's')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 's')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 's')"
                  />
                  <TextInput
                    v-model="hsl.l"
                    autocomplete="off"
                    name="lightness"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSL(e, 'l')"
                    @keydown.enter.prevent="e => inputChangeHSL(e, 'l')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'l')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'l')"
                  />
                </template>
                <template v-else-if="currentColorFormat === 'hsb'">
                  <TextInput
                    v-model="hsv.h"
                    autocomplete="off"
                    name="hue"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSB(e, 'h')"
                    @keydown.enter.prevent="e => inputChangeHSB(e, 'h')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'h')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'h')"
                  />
                  <TextInput
                    v-model="hsv.s"
                    autocomplete="off"
                    name="saturation"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSB(e, 's')"
                    @keydown.enter.prevent="e => inputChangeHSB(e, 's')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 's')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 's')"
                  />
                  <TextInput
                    v-model="hsv.v"
                    autocomplete="off"
                    name="brightness"
                    type="text"
                    class="color-input"
                    size="xs"
                    @beforeinput="validateInput"
                    @focusout="e => inputChangeHSB(e, 'v')"
                    @keydown.enter.prevent="e => inputChangeHSB(e, 'v')"
                    @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'v')"
                    @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'v')"
                  />
                </template>
                <TextInput
                  autocomplete="off"
                  name="alpha"
                  placeholder="100"
                  type="text"
                  class="color-input"
                  size="xs"
                  :value="`${(tinyColorRef.getAlpha() * 100).toFixed()}%`"
                  @beforeinput="validateInput"
                  @focusout="inputChangeAlpha"
                  @keydown.enter.prevent.stop="inputChangeAlpha"
                  @keydown.up.prevent.stop="e => handleColorValueKeyDown(e, 'a')"
                  @keydown.down.prevent.stop="e => handleColorValueKeyDown(e, 'a')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="celeste-color-swatches">
          <slot v-if="$slots.swatches" name="swatches" />
          <ColorSwatch
            v-else
            v-model="tinyColorRef"
            :hue="hueRef"
          />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped lang="scss">
.celeste-picker-trigger {
  gap: var(--spacing-12);

  .celeste-selected-color {
    --color-tile-size: 20px;

    display: block;
    width: var(--color-tile-size);
    height: var(--color-tile-size);
    border-radius: var(--radius-4);
    background-color: v-bind(modelValue);
  }
}

.celeste-color-picker-wrapper {
  display: grid;
  box-sizing: border-box;
  width: 272px;

  .celeste-color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-16);
    gap: var(--spacing-12);

    & > * {
      box-sizing: border-box;
    }

    .celeste-color-control-panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: var(--spacing-4);

      .celeste-selected-color-format {
        text-transform: uppercase;
      }

      .celeste-color-controls {
        display: flex;
        width: 100%;
        height: 32px;

        .celeste-color-sip {
          border-start-end-radius: 0;
          border-end-end-radius: 0;

          &:focus-within {
            z-index: 2;
          }
        }

        & > * {
          box-sizing: border-box;
          height: 100%;
        }

        .celeste-color-format-inputs {
          display: flex;

          .color-input {
            margin-inline-start: -1px;
            border-radius: 0;

            &:focus-within {
              z-index: 2;
            }

            &:last-child {
              border-start-end-radius: var(--radius-8);
              border-end-end-radius: var(--radius-8);
            }

            &:first-child:nth-last-child(4),
            &:first-child:nth-last-child(4) ~ * {
              flex: 1;
            }

            &:first-child:nth-last-child(2) {
              flex: 3;
            }

            &:last-child:nth-child(2) {
              flex: 1;
            }
          }

          &:first-child:last-child {
            .color-input:first-child {
              border-start-start-radius: var(--radius-8);
              border-end-start-radius: var(--radius-8);
            }
          }
        }
      }
    }
  }

  .celeste-color-swatches {
    display: flex;
    flex-direction: column;
    padding: var(--radius-16);
    border-block-start: 1px solid var(--color-stroke-soft-200);
  }
}

:deep(.celeste-color-format) {
  text-transform: uppercase;
}

:deep(.celeste-color-thumb) {
  position: absolute;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow:
    0 0 0 2px var(--color-bg-white-0),
    var(--shadow-toggle-switch);
}

:deep(.celeste-color-slider) {
  --track-height: 8px;

  width: 100%;
  padding-block: var(--spacing-4);

  .slider-track {
    position: relative;
    width: 100%;
    height: var(--track-height);
    border-radius: calc(var(--track-height) / 2);

    .celeste-color-thumb {
      top: calc(var(--track-height) / 2);
    }
  }
}
</style>
