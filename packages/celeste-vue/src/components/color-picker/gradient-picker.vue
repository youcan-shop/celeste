<script setup lang="ts">
import type { GradientType } from '@/utils/gradient';
import tinycolor from 'tinycolor2';
import { computed, reactive, ref, watch } from 'vue';
import { parseGradient, stringifyGradient } from '@/utils/gradient';
import { CompactButton } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { TextInput } from '../text-input';
import { Tooltip } from '../tooltip';

export interface GradientPickerProps {
  modelValue?: string;
  placeholder?: string;
  emptyHint?: string;
  noneLabel?: string;
  linearLabel?: string;
  radialLabel?: string;
  angleLabel?: string;
  colorStopLabel?: string;
  addStopLabel?: string;
  removeStopLabel?: string;
  positionLabel?: string;
  opacityLabel?: string;
  hueLabel?: string;
  areaLabel?: string;
  eyedropperLabel?: string;
  usedLabel?: string;
  removeLabel?: string;
  presets?: string[];
  swatches?: string[];
}

export interface GradientPickerEmits {
  'update:modelValue': [value: string];
}

interface Stop { id: number; h: number; s: number; v: number; a: number; position: number }
interface State { type: GradientType; angle: number; shape?: string; stops: Stop[] }

const props = withDefaults(defineProps<GradientPickerProps>(), {
  modelValue: '',
  placeholder: 'No gradient chosen',
  emptyHint: 'Select a gradient to begin editing',
  noneLabel: 'None',
  linearLabel: 'Linear gradient',
  radialLabel: 'Radial gradient',
  angleLabel: 'Angle',
  colorStopLabel: 'Color stop',
  addStopLabel: 'Add stop',
  removeStopLabel: 'Remove stop',
  positionLabel: 'Position',
  opacityLabel: 'Opacity',
  hueLabel: 'Hue',
  areaLabel: 'Saturation and brightness',
  eyedropperLabel: 'Pick color',
  usedLabel: 'Currently used',
  removeLabel: 'Remove gradient',
  presets: () => [
    'linear-gradient(135deg, #e1116f 0%, #7d52f4 100%)',
    'linear-gradient(180deg, #f7f1e8 0%, #e3cfb4 100%)',
    'linear-gradient(160deg, #1f3d2b 0%, #4f7a5a 100%)',
    'linear-gradient(180deg, #3d3d3d 0%, #171717 100%)',
    'radial-gradient(#ffffff 0%, #dbe4ee 100%)',
    'linear-gradient(135deg, #e8a07a 0%, #b5532f 100%)',
    'linear-gradient(200deg, #0b3c5d 0%, #1e7f8c 100%)',
    'radial-gradient(#fff1f5 0%, #f7b5c9 100%)',
    'linear-gradient(120deg, #d6d29a 0%, #7a7a3a 100%)',
    'linear-gradient(180deg, #1b1f3b 0%, #4b3f8f 100%)',
    'linear-gradient(90deg, #ffd86b 0%, #f08a24 100%)',
  ],
  swatches: () => ['#ffffff', '#171717', '#f5f5f5', '#222530', '#000000', '#335cff', '#e1116f'],
});

const emit = defineEmits<GradientPickerEmits>();

const open = ref(false);
const state = ref<State | null>(null);
const selected = ref<number>();
const removing = ref<number>();
const drafts = reactive<Record<string, string>>({});
const preview = ref<HTMLElement>();
const bar = ref<HTMLElement>();
const area = ref<HTMLElement>();
const hue = ref<HTMLElement>();
const alpha = ref<HTMLElement>();
let uid = 0;
let emitted: string | undefined;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const numeric = (raw: string) => raw.trim() !== '' && !Number.isNaN(Number(raw));

function hsva(color: string) {
  const parsed = tinycolor(color);
  const { h, s, v } = parsed.toHsv();

  return { h, s: s * 100, v: v * 100, a: parsed.getAlpha() };
}

function colorOf(stop: Omit<Stop, 'id' | 'position'>) {
  const color = tinycolor({ h: stop.h, s: stop.s / 100, v: stop.v / 100, a: stop.a });

  return stop.a >= 1 ? color.toHexString() : color.toRgbString();
}

function toCss(value: State, linear = false) {
  return stringifyGradient({
    type: linear ? 'linear' : value.type,
    angle: linear ? 90 : value.angle,
    shape: value.shape,
    stops: value.stops.map(stop => ({ color: colorOf(stop), position: stop.position })),
  });
}

function load(value?: string) {
  const gradient = parseGradient(value);

  state.value = gradient && {
    type: gradient.type,
    angle: gradient.angle,
    shape: gradient.shape,
    stops: gradient.stops.map(stop => ({ id: ++uid, ...hsva(stop.color), position: stop.position })),
  };
  selected.value = state.value?.stops[0].id;
}

watch(() => props.modelValue, value => value !== emitted && load(value), { immediate: true });

const css = computed(() => (state.value ? toCss(state.value) : ''));
const track = computed(() => (state.value ? toCss(state.value, true) : ''));
const current = computed(() => state.value?.stops.find(stop => stop.id === selected.value));
const solid = computed(() => current.value && colorOf({ ...current.value, a: 1 }));

function save() {
  emitted = state.value ? toCss(state.value) : '';
  emit('update:modelValue', emitted);
}

function patch(changes: Partial<Stop>, keepDrafts = false) {
  Object.assign(current.value!, changes);
  keepDrafts || Object.keys(drafts).forEach(key => delete drafts[key]);
  save();
}

function field(key: string, value: string | number, commit: (raw: string) => unknown) {
  return {
    value: drafts[key] ?? String(value),
    input: (raw?: string | number) => {
      drafts[key] = String(raw ?? '');
      commit(drafts[key].trim());
    },
  };
}

const fields = computed(() => current.value && {
  hex: field('hex', solid.value!.toUpperCase(), raw => /^#?[0-9a-f]{6}$/i.test(raw) && patch({ ...hsva(raw.replace(/^#?/, '#')), a: current.value!.a }, true)),
  alpha: field('alpha', Math.round(current.value.a * 100), raw => numeric(raw) && patch({ a: clamp(Number(raw), 0, 100) / 100 }, true)),
  position: field('position', current.value.position, raw => numeric(raw) && patch({ position: clamp(Math.round(Number(raw)), 0, 100) }, true)),
  angle: field('angle', state.value!.angle, (raw) => {
    if (numeric(raw)) {
      state.value!.angle = ((Math.round(Number(raw)) % 360) + 360) % 360;
      save();
    }
  }),
});

function drag(event: PointerEvent, move: (event: PointerEvent) => void, up?: () => void) {
  event.preventDefault();
  move(event);

  const stop = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', stop);
    up?.();
  };

  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', stop);
}

function keys(event: KeyboardEvent, apply: (dx: number, dy: number) => void) {
  const step = event.shiftKey ? 10 : 1;
  const delta = ({ ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] } as Record<string, [number, number]>)[event.key];

  if (delta) {
    event.preventDefault();
    apply(...delta);
  }
}

function onHandleKey(event: KeyboardEvent, id: number) {
  selected.value = id;

  if (['Delete', 'Backspace'].includes(event.key) && state.value!.stops.length > 2) {
    event.preventDefault();
    removeStop();
  }

  keys(event, (dx, dy) => patch({ position: clamp(current.value!.position + dx - dy, 0, 100) }));
}

function relative(element: HTMLElement, event: PointerEvent, inset = 0) {
  const rect = element.getBoundingClientRect();

  return {
    x: clamp((event.clientX - rect.left - inset) / (rect.width - 2 * inset), 0, 1),
    y: clamp((event.clientY - rect.top - inset) / (rect.height - 2 * inset), 0, 1),
    dy: event.clientY - rect.top - rect.height / 2,
  };
}

function colorAt(position: number) {
  const stops = [...state.value!.stops].sort((a, b) => a.position - b.position);
  const after = stops.find(stop => stop.position >= position) ?? stops.at(-1)!;
  const before = stops.findLast(stop => stop.position <= position) ?? stops[0];
  const ratio = after.position === before.position ? 0 : (position - before.position) / (after.position - before.position);
  const mixed = tinycolor.mix(colorOf({ ...before, a: 1 }), colorOf({ ...after, a: 1 }), ratio * 100).toHexString();

  return { ...hsva(mixed), a: before.a + (after.a - before.a) * ratio };
}

function addAt(position: number) {
  const id = ++uid;

  state.value!.stops.push({ id, ...colorAt(position), position });
  selected.value = id;
  save();

  return id;
}

function dragStop(event: PointerEvent, id: number) {
  selected.value = id;
  Object.keys(drafts).forEach(key => delete drafts[key]);

  drag(event, (moved) => {
    const { x, dy } = relative(bar.value!, moved, 10);

    current.value!.position = Math.round(x * 100);
    removing.value = state.value!.stops.length > 2 && Math.abs(dy) > 40 ? id : undefined;
    save();
  }, () => removing.value === id && removeStop());
}

function onBar(event: PointerEvent) {
  event.target === event.currentTarget && dragStop(event, addAt(Math.round(relative(bar.value!, event, 10).x * 100)));
}

function onPreview(event: PointerEvent) {
  state.value!.type === 'linear' && drag(event, (moved) => {
    const rect = preview.value!.getBoundingClientRect();
    const radians = Math.atan2(moved.clientX - rect.left - rect.width / 2, rect.top + rect.height / 2 - moved.clientY);
    const degrees = (radians * 180) / Math.PI + 360;

    state.value!.angle = Math.round(moved.shiftKey ? Math.round(degrees / 15) * 15 : degrees) % 360;
    delete drafts.angle;
    save();
  });
}

function onArea(event: PointerEvent) {
  drag(event, (moved) => {
    const { x, y } = relative(area.value!, moved);

    patch({ s: x * 100, v: (1 - y) * 100 });
  });
}

function onHue(event: PointerEvent) {
  drag(event, moved => patch({ h: Math.min(relative(hue.value!, moved, 12).y * 360, 359) }));
}

function onAlpha(event: PointerEvent) {
  drag(event, moved => patch({ a: Math.round((1 - relative(alpha.value!, moved, 12).y) * 100) / 100 }));
}

function addStop() {
  const stops = [...state.value!.stops].sort((a, b) => a.position - b.position);
  const index = stops.indexOf(current.value!);
  const next = stops[index + 1] ?? stops[index - 1];

  addAt(Math.round((current.value!.position + next.position) / 2));
}

function removeStop() {
  state.value!.stops = state.value!.stops.filter(stop => stop.id !== selected.value);
  selected.value = state.value!.stops[0].id;
  removing.value = undefined;
  save();
}

function setType(type: GradientType) {
  state.value!.type = type;
  save();
}

function pick(value: string) {
  load(value);
  save();
}

async function sip() {
  const result = await new window.EyeDropper!().open().catch(() => undefined);

  result && patch({ ...hsva(result.sRGBHex), a: current.value!.a });
}

const fill = (color: string) => `linear-gradient(${color}, ${color}), repeating-conic-gradient(#e5e5e5 0 25%, #fff 0 50%) 0 0 / 8px 8px`;
const along = (fraction: number) => `calc(12px + (100% - 24px) * ${fraction})`;
const canSip = 'EyeDropper' in window;
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <button type="button" class="celeste-gradient-trigger">
        <span
          class="celeste-gradient-swatch"
          :data-empty="!state"
          :style="state ? { background: css } : undefined"
        />
        <span class="celeste-gradient-summary">
          {{ state ? (state.type === 'linear' ? linearLabel : radialLabel) : placeholder }}
        </span>
        <i class="i-celeste-expand-up-down-line" />
      </button>
    </PopoverTrigger>
    <PopoverContent
      :dismissible="false"
      :show-tail="false"
      align="start"
      @open-auto-focus.prevent
    >
      <div class="celeste-gradient-picker">
        <div v-if="!state" class="celeste-gradient-section">
          <span class="celeste-gradient-hint">{{ emptyHint }}</span>
          <div class="celeste-gradient-presets">
            <button
              type="button"
              class="celeste-gradient-preset"
              data-empty="true"
              :title="noneLabel"
              :aria-label="noneLabel"
              @click="open = false"
            />
            <button
              v-for="preset in presets"
              :key="preset"
              type="button"
              class="celeste-gradient-preset"
              :style="{ background: preset }"
              :aria-label="preset"
              @click="pick(preset)"
            />
          </div>
        </div>

        <template v-else-if="current && fields">
          <div class="celeste-gradient-section">
            <div
              ref="preview"
              class="celeste-gradient-preview"
              :data-linear="state.type === 'linear'"
              @pointerdown="onPreview"
            >
              <span class="celeste-gradient-fill" :style="{ background: css }" />
              <span v-if="state.type === 'linear'" class="celeste-gradient-ring">
                <span :style="{ rotate: `${state.angle}deg` }" />
              </span>
            </div>

            <div class="celeste-gradient-row">
              <Tooltip
                v-for="type in (['linear', 'radial'] as const)"
                :key="type"
                :title="type === 'linear' ? linearLabel : radialLabel"
                size="xs"
                variant="dark"
              >
                <button
                  type="button"
                  class="celeste-gradient-type"
                  :data-type="type"
                  :data-active="state.type === type"
                  :aria-label="type === 'linear' ? linearLabel : radialLabel"
                  @click="setType(type)"
                >
                  <span />
                </button>
              </Tooltip>
              <TextInput
                v-if="state.type === 'linear'"
                :model-value="fields.angle.value"
                inputmode="numeric"
                size="xs"
                :aria-label="angleLabel"
                class="celeste-gradient-number"
                @update:model-value="fields.angle.input"
              >
                <template #trailingNode>
                  °
                </template>
              </TextInput>
            </div>

            <div
              ref="bar"
              class="celeste-gradient-bar"
              @pointerdown="onBar"
            >
              <span class="celeste-gradient-fill" :style="{ background: track }" />
              <button
                v-for="stop in state.stops"
                :key="stop.id"
                type="button"
                class="celeste-gradient-handle"
                :style="{ left: `calc(10px + (100% - 20px) * ${stop.position / 100})`, background: fill(colorOf(stop)) }"
                :data-active="stop.id === selected"
                :data-removing="stop.id === removing"
                :aria-label="`${colorOf(stop)} ${stop.position}%`"
                @pointerdown.stop="dragStop($event, stop.id)"
                @keydown="onHandleKey($event, stop.id)"
              />
            </div>

            <div class="celeste-gradient-row">
              <span class="celeste-gradient-eyebrow">{{ colorStopLabel }}</span>
              <CompactButton
                icon="i-celeste-add-line"
                variant="ghost"
                size="md"
                :aria-label="addStopLabel"
                @click="addStop"
              />
              <CompactButton
                icon="i-celeste-subtract-line"
                variant="ghost"
                size="md"
                :aria-label="removeStopLabel"
                :disabled="state.stops.length <= 2"
                @click="removeStop"
              />
            </div>

            <div class="celeste-gradient-row">
              <span class="celeste-gradient-label">{{ positionLabel }}</span>
              <TextInput
                :model-value="fields.position.value"
                inputmode="numeric"
                size="xs"
                :aria-label="positionLabel"
                class="celeste-gradient-number"
                @update:model-value="fields.position.input"
              >
                <template #trailingNode>
                  %
                </template>
              </TextInput>
            </div>

            <div class="celeste-gradient-row">
              <span class="celeste-gradient-current">
                <span class="celeste-gradient-fill" :style="{ background: colorOf(current) }" />
              </span>
              <TextInput
                :model-value="fields.hex.value"
                size="xs"
                class="celeste-gradient-hex"
                @update:model-value="fields.hex.input"
              >
                <template v-if="canSip" #trailingNode>
                  <CompactButton
                    icon="i-celeste-sip-line"
                    variant="ghost"
                    size="md"
                    :aria-label="eyedropperLabel"
                    @click="sip"
                  />
                </template>
              </TextInput>
              <TextInput
                :model-value="fields.alpha.value"
                inputmode="numeric"
                size="xs"
                :aria-label="opacityLabel"
                class="celeste-gradient-number"
                @update:model-value="fields.alpha.input"
              >
                <template #trailingNode>
                  %
                </template>
              </TextInput>
            </div>

            <div class="celeste-gradient-color">
              <div
                ref="area"
                class="celeste-gradient-area"
                :style="{ backgroundColor: `hsl(${current.h}, 100%, 50%)` }"
                role="slider"
                tabindex="0"
                :aria-label="areaLabel"
                :aria-valuenow="Math.round(current.s)"
                :aria-valuetext="`${Math.round(current.s)}%, ${Math.round(current.v)}%`"
                @pointerdown="onArea"
                @keydown="keys($event, (dx, dy) => patch({ s: clamp(current!.s + dx, 0, 100), v: clamp(current!.v - dy, 0, 100) }))"
              >
                <span class="celeste-gradient-knob" :style="{ left: `${current.s}%`, top: `${100 - current.v}%`, background: fill(colorOf(current)) }" />
              </div>
              <div
                ref="hue"
                class="celeste-gradient-slider"
                data-hue="true"
                role="slider"
                tabindex="0"
                aria-orientation="vertical"
                aria-valuemin="0"
                aria-valuemax="359"
                :aria-label="hueLabel"
                :aria-valuenow="Math.round(current.h)"
                @pointerdown="onHue"
                @keydown="keys($event, (dx, dy) => patch({ h: clamp(current!.h + dx + dy, 0, 359) }))"
              >
                <span class="celeste-gradient-knob" :style="{ top: along(current.h / 360), background: fill(colorOf(current)) }" />
              </div>
              <div
                ref="alpha"
                class="celeste-gradient-slider"
                role="slider"
                tabindex="0"
                aria-orientation="vertical"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="opacityLabel"
                :aria-valuenow="Math.round(current.a * 100)"
                @pointerdown="onAlpha"
                @keydown="keys($event, (dx, dy) => patch({ a: clamp(Math.round(current!.a * 100 + dx - dy), 0, 100) / 100 }))"
              >
                <span class="celeste-gradient-fill" :style="{ background: `linear-gradient(${solid}, transparent)` }" />
                <span class="celeste-gradient-knob" :style="{ top: along(1 - current.a), background: fill(colorOf(current)) }" />
              </div>
            </div>
          </div>

          <div class="celeste-gradient-section celeste-gradient-used">
            <span class="celeste-gradient-label">{{ usedLabel }}</span>
            <div class="celeste-gradient-swatches">
              <button
                v-for="swatch in swatches"
                :key="swatch"
                type="button"
                :style="{ background: swatch }"
                :title="swatch"
                :aria-label="swatch"
                @click="patch({ ...hsva(swatch), a: current.a })"
              />
            </div>
          </div>

          <div class="celeste-gradient-footer">
            <button
              type="button"
              class="celeste-gradient-remove"
              @click="pick('')"
            >
              <i class="i-celeste-delete-bin-line" />
              {{ removeLabel }}
            </button>
          </div>
        </template>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped lang="scss">
$checker: repeating-conic-gradient(#e5e5e5 0 25%, #fff 0 50%) 0 0 / 8px 8px;
$none:
  linear-gradient(135deg, transparent 47%, var(--color-stroke-sub-300) 47% 53%, transparent 53%),
  var(--color-bg-white-0);
$inset: inset 0 0 0 1px #0000001a;

.celeste-gradient-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  padding: 0 var(--spacing-8) 0 var(--spacing-6);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-8);
  background: var(--color-bg-white-0);
  box-shadow: var(--shadow-regular-xs);
  color: var(--color-text-strong-950);
  font: var(--label-sm);
  text-align: start;
  cursor: pointer;
  gap: var(--spacing-8);

  &:hover {
    background: var(--color-bg-weak-50);
  }

  i {
    flex: none;
    width: 16px;
    height: 16px;
    color: var(--color-icon-sub-600);
  }
}

.celeste-gradient-swatch {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  box-shadow: $inset;

  &[data-empty='true'] {
    background: $none;
  }
}

.celeste-gradient-summary {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.celeste-gradient-picker {
  display: flex;
  flex-direction: column;
  width: 304px;
  max-height: var(--reka-popover-content-available-height);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.celeste-gradient-section {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-16);
  gap: var(--spacing-12);
}

.celeste-gradient-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: $inset;
  pointer-events: none;
}

.celeste-gradient-hint {
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
}

.celeste-gradient-presets {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-8);
}

.celeste-gradient-preset {
  aspect-ratio: 1;
  padding: 0;
  transition: box-shadow 200ms ease-out;
  border: 0;
  border-radius: var(--radius-full);
  box-shadow: $inset;
  cursor: pointer;

  &[data-empty='true'] {
    background: $none;
  }

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow:
      $inset,
      0 0 0 2px var(--color-bg-white-0),
      0 0 0 4px var(--color-primary-base);
  }
}

.celeste-gradient-preview {
  position: relative;
  height: 144px;
  border-radius: var(--radius-12);
  background: $checker;
  touch-action: none;

  &[data-linear='true'] {
    cursor: grab;
  }
}

.celeste-gradient-ring {
  position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  width: 80px;
  height: 80px;
  border: 2px solid #ffffffb3;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 1px #0000001a;
  pointer-events: none;

  span {
    position: absolute;
    inset: -2px;

    &::after {
      content: '';
      position: absolute;
      top: -6px;
      left: calc(50% - 6px);
      width: 12px;
      height: 12px;
      border-radius: var(--radius-full);
      background: var(--color-static-white);
      box-shadow: 0 1px 3px #0e121b40;
    }
  }
}

.celeste-gradient-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.celeste-gradient-type {
  width: 40px;
  height: 40px;
  padding: var(--spacing-4);
  border: 1px solid var(--color-stroke-soft-200);
  border-radius: var(--radius-10);
  background: var(--color-bg-white-0);
  cursor: pointer;

  &[data-active='true'] {
    border-color: var(--color-primary-base);
    box-shadow: 0 0 0 2px var(--color-primary-alpha-10);
  }

  span {
    display: block;
    height: 100%;
    border-radius: var(--radius-6);
    background: linear-gradient(var(--color-bg-white-0), var(--color-text-soft-400));
    box-shadow: $inset;
  }

  &[data-type='radial'] span {
    background: radial-gradient(var(--color-bg-white-0), var(--color-text-soft-400));
  }
}

.celeste-gradient-number {
  flex: none;
  width: 80px;
  margin-inline-start: auto;
}

.celeste-gradient-bar {
  position: relative;
  height: 24px;
  border-radius: var(--radius-full);
  background: $checker;
  cursor: copy;
  touch-action: none;
}

.celeste-gradient-handle {
  position: absolute;
  top: calc(50% - 10px);
  width: 20px;
  height: 20px;
  margin-inline-start: -10px;
  padding: 0;
  border: 3px solid var(--color-static-white);
  border-radius: var(--radius-full);
  box-shadow:
    0 0 0 1px #0000002e,
    0 1px 3px #0e121b40;
  cursor: grab;
  touch-action: none;

  &[data-active='true'] {
    box-shadow:
      0 0 0 2px var(--color-primary-base),
      0 1px 3px #0e121b40;
  }

  &[data-removing='true'] {
    opacity: 0.3;
  }
}

.celeste-gradient-eyebrow {
  flex: 1;
  color: var(--color-text-soft-400);
  font: var(--subheading-xxs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.celeste-gradient-label {
  flex: 1;
  color: var(--color-text-sub-600);
  font: var(--label-xs);
}

.celeste-gradient-current {
  position: relative;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-8);
  background: $checker;
}

.celeste-gradient-hex {
  flex: 1;
  min-width: 0;
}

.celeste-gradient-color {
  display: flex;
  height: 200px;
  gap: var(--spacing-8);
}

.celeste-gradient-area {
  position: relative;
  flex: 1;
  border-radius: var(--radius-10);
  background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent);
  cursor: crosshair;
  touch-action: none;
}

.celeste-gradient-slider {
  position: relative;
  flex: none;
  width: 24px;
  border-radius: var(--radius-full);
  background: $checker;
  cursor: pointer;
  touch-action: none;

  &[data-hue='true'] {
    background: linear-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  }

  .celeste-gradient-knob {
    left: 50%;
  }
}

.celeste-gradient-area,
.celeste-gradient-slider,
.celeste-gradient-handle {
  &:focus-visible {
    outline: 2px solid var(--color-primary-base);
    outline-offset: 2px;
  }
}

.celeste-gradient-knob {
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border: 3px solid var(--color-static-white);
  border-radius: var(--radius-full);
  box-shadow:
    0 0 0 1px #0000001f,
    0 1px 3px #0e121b40;
  pointer-events: none;
}

.celeste-gradient-used {
  padding-top: var(--spacing-12);
  border-top: 1px solid var(--color-stroke-soft-200);
  gap: var(--spacing-8);
}

.celeste-gradient-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);

  button {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-8);
    box-shadow: $inset;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      outline: none;
      box-shadow:
        $inset,
        0 0 0 2px var(--color-bg-white-0),
        0 0 0 3px var(--color-stroke-sub-300);
    }
  }
}

.celeste-gradient-footer {
  padding: var(--spacing-8);
  border-top: 1px solid var(--color-stroke-soft-200);
}

.celeste-gradient-remove {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-8);
  border: 0;
  border-radius: var(--radius-8);
  background: transparent;
  color: var(--color-text-sub-600);
  font: var(--label-sm);
  cursor: pointer;
  gap: var(--spacing-8);

  &:hover {
    background: var(--color-bg-weak-50);
    color: var(--color-text-strong-950);
  }

  i {
    width: 20px;
    height: 20px;
  }
}
</style>
