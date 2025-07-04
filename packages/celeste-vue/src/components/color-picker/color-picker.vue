<script setup lang="ts">
import { useDelegatedProps } from '@/composables/use-delegated-props';
import { useForwardPropsEmits } from 'radix-vue';
import tinycolor from 'tinycolor2';
import { computed, type HTMLAttributes, ref, watch } from 'vue';
import { Button } from '../button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { TextInput } from '../text-input';
import { ColorArea, HueSlider } from './';
import AlphaSlider from './alpha-slider.vue';
import ColorSwatch from './color-swatch.vue';
import { defineColorModel } from './composable/use-color-model';
import { resolveArrowDirection } from './utils';

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: 'hsl(240, 100%, 50%)',
  formats: () => ['hex', 'rgb', 'hsl', 'hsb'],
});

const emit = defineEmits<ColorPickerEmits>();

const delegatedProps = useDelegatedProps(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emit);

const tinyColorRef = defineColorModel(props, emit);
const hueRef = ref(tinyColorRef.value.toHsl().h);
const currentColorFormat = ref(props.formats[0] || 'hex');
const eyeDropper = ref<EyeDropper | null>(null);

const rgb = computed(() => {
  return tinyColorRef.value.toRgb();
});

// const hsl = computed(() => {
//   const { h, s, l } = tinyColorRef.value.toHsl();
//   return {
//     h: h.toFixed(),
//     s: `${(s * 100).toFixed()}%`,
//     l: `${(l * 100).toFixed()}%`,
//   };
// });

watch(tinyColorRef, (tinyColorInstance) => {
  const { h: newHue, s: saturation } = tinyColorInstance.toHsl();

  // Preserve hue when color becomes grayscale (saturation = 0)
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

function inputChangeHex(event: Event) {
  const colorInput = (event.target as HTMLInputElement)?.value;

  if (!colorInput) {
    return;
  }

  tinyColorRef.value = tinycolor(colorInput);
}

function inputChangeRGB(event: Event, key: 'r' | 'g' | 'b') {
  const value = Number((event.target as HTMLInputElement)?.value);
  const currentRgb = rgb.value;
  const newRgb = { ...currentRgb, [key]: value };

  tinyColorRef.value = tinycolor(newRgb);
}

function validateAlphaInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  const validPattern = /^\d*\s?%?$/;

  if (!validPattern.test(value)) {
    input.value = `${(tinyColorRef.value.getAlpha() * 100).toFixed()} %`;
  }
}

function inputChangeAlpha(event: Event) {
  const alphaValue = (event.target as HTMLInputElement)?.value;
  const alphaInput = Math.trunc(Number(alphaValue.replace('%', '').trim())) / 100;

  if (Number.isNaN(alphaInput)) {
    return;
  }

  tinyColorRef.value = tinyColorRef.value.setAlpha(Math.max(0, Math.min(1, alphaInput)));
}

function handleKeyDown(event: KeyboardEvent) {
  const direction = resolveArrowDirection(event);
  const currentAlpha = tinyColorRef.value.getAlpha() * 100;

  let multiplier = 1;

  switch (direction) {
    case 'down':
      multiplier = -1;
      break;
    case 'up':
      multiplier = 1;
      break;
  }

  tinyColorRef.value = tinyColorRef.value.setAlpha((currentAlpha + multiplier) / 100);
}
</script>

<script lang="ts">
export type ColorFormats = 'hex' | 'rgb' | 'hsl' | 'hsb';

export interface ColorPickerProps {
  modelValue: string | tinycolor.ColorInput;
  class?: HTMLAttributes['class'];
  formats?: ColorFormats[];
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
  <div class="celeste-color-picker-wrapper" v-bind="forwarded">
    <div class="celeste-color-picker">
      <ColorArea
        v-model="tinyColorRef"
        :hue="hueRef"
      />
      <HueSlider v-model="hueRef" />
      <AlphaSlider v-model="tinyColorRef" />
      <div class="celeste-color-control-panel">
        <Select v-model="currentColorFormat">
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
            variant="stroke"
            size="xxs"
            intent="neutral"
            @click="sipColor"
          >
            <i i-celeste-sip-line />
          </Button>
          <div class="celeste-color-format-inputs">
            <template v-if="currentColorFormat === 'hex'">
              <TextInput
                name="hex"
                placeholder="#FFFFFF"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
            </template>
            <template v-else-if="currentColorFormat === 'rgb'">
              <TextInput
                name="red"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toRgb().r"
                @focusout="e => inputChangeRGB(e, 'r')"
                @keydown.enter.prevent="e => inputChangeRGB(e, 'r')"
              />
              <TextInput
                name="green"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toRgb().g"
                @focusout="e => inputChangeRGB(e, 'g')"
                @keydown.enter.prevent="e => inputChangeRGB(e, 'g')"
              />
              <TextInput
                name="blue"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toRgb().b"
                @focusout="e => inputChangeRGB(e, 'b')"
                @keydown.enter.prevent="e => inputChangeRGB(e, 'b')"
              />
            </template>
            <template v-else-if="currentColorFormat === 'hsl'">
              <TextInput
                name="hue"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
              <TextInput
                name="saturation"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
              <TextInput
                name="lightness"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
            </template>
            <template v-else-if="currentColorFormat === 'hsb'">
              <TextInput
                name="hue"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
              <TextInput
                name="saturation"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
              <TextInput
                name="brightness"
                type="text"
                class="color-input"
                size="xs"
                :value="tinyColorRef.toHexString().toUpperCase()"
                @focusout="inputChangeHex"
                @keydown.enter.prevent="inputChangeHex"
              />
            </template>
          </div>
          <TextInput
            name="alpha"
            placeholder="100"
            type="text"
            class="color-input"
            size="xs"
            :value="`${(tinyColorRef.getAlpha() * 100).toFixed()} %`"
            @input="validateAlphaInput"
            @focusout="inputChangeAlpha"
            @keydown.enter.prevent.stop="inputChangeAlpha"
            @keydown.up.prevent.stop="handleKeyDown"
            @keydown.down.prevent.stop="handleKeyDown"
          />
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
</template>

<style scoped lang="scss">
.celeste-color-picker-wrapper {
  display: grid;
  box-sizing: border-box;
  width: 272px;
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-16);

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

        & > * {
          box-sizing: border-box;
          height: 100%;
        }

        & > *:first-child {
          border-end-end-radius: 0;
          border-start-end-radius: 0;
          margin-inline-end: -1px;
        }

        & > *:last-child {
          z-index: 1;
          flex: 1;
          margin-inline-start: -1px;
          border-start-start-radius: 0;
          border-end-start-radius: 0;
        }

        & > *:not(:last-child, :first-child) {
          flex: 3;
          border-radius: 0;

          &:focus-within {
            z-index: 2;
          }
        }

        .celeste-color-format-inputs {
          display: flex;

          & > .color-input {
            margin-inline-start: -1px;
            border-radius: 0;

            &:focus-within {
              z-index: 2;
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
