<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import clsx from 'clsx';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

type Animation = 'blink-twice' | 'blink-once' | 'look-blink-twice' | 'look-blink-once';
type PeekSide = 'bottom' | 'right' | 'top' | 'left';
type Peek = '' | 'drop' | 'hidden' | 'out' | 'home';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    size?: number;
    animate?: boolean;
    thinking?: boolean;
  }>(),
  {
    size: 40,
    animate: false,
    thinking: false,
  },
);

const idle = defineModel<boolean>('idle', { default: false });

const DROP_DURATION = 2010;
const HIDE_DURATION = 420;
const SETTLE_DURATION = 500;

const durations: Record<Animation, number> = { 'blink-twice': 440, 'blink-once': 160, 'look-blink-twice': 3000, 'look-blink-once': 2800 };
const weights: [Animation, number][] = [['blink-twice', 35], ['blink-once', 35], ['look-blink-twice', 15], ['look-blink-once', 15]];
const rotation: Record<PeekSide, string> = { bottom: '0deg', right: '-90deg', top: '180deg', left: '90deg' };
const order: PeekSide[] = ['bottom', 'right', 'top', 'left'];

const anim = ref<Animation | ''>('');
const peek = ref<Peek>('');
const peekSide = ref<PeekSide>('bottom');

const sizePx = computed(() => `${props.size}px`);
const rotate = computed(() => rotation[peekSide.value]);

let retired = false;
let frame: number | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let peekTimer: ReturnType<typeof setTimeout> | undefined;

function pick(): Animation {
  let r = Math.random() * 100;
  for (const [name, weight] of weights) {
    r -= weight;
    if (r <= 0) {
      return name;
    }
  }

  return 'blink-twice';
}

function cycle() {
  clearTimeout(timer);
  cancelAnimationFrame(frame ?? 0);
  anim.value = '';
  if (!props.animate || peek.value) {
    return;
  }
  frame = requestAnimationFrame(() => {
    const next = pick();
    anim.value = next;
    timer = setTimeout(cycle, durations[next] + 800 + Math.random() * 1600);
  });
}

function later(fn: () => void, ms: number) {
  clearTimeout(peekTimer);
  peekTimer = setTimeout(fn, ms);
}

function drop() {
  peekSide.value = 'bottom';
  peek.value = 'drop';
  cycle();
  later(() => {
    peek.value = 'out';
  }, DROP_DURATION);
}

function settle() {
  peekSide.value = 'bottom';
  peek.value = 'home';
  later(() => {
    peek.value = '';
    cycle();
  }, SETTLE_DURATION);
}

function hop() {
  peek.value = 'hidden';
  later(() => {
    const next = order[(order.indexOf(peekSide.value) + 1) % order.length];
    if (next === 'bottom') {
      retired = true;
      settle();
      idle.value = false;

      return;
    }
    peekSide.value = next;
    peek.value = 'out';
  }, HIDE_DURATION);
}

function poke() {
  if (peek.value === 'out') {
    hop();
  }
  else if (!peek.value && props.animate && !retired) {
    idle.value = true;
  }
}

watch(() => idle.value && props.animate, (active) => {
  if (active && !retired && !peek.value) {
    drop();
  }
  else if (!active && peek.value && peek.value !== 'home') {
    peek.value = 'hidden';
    later(settle, HIDE_DURATION);
  }
}, { immediate: true });

watch(() => props.animate, cycle);
onMounted(cycle);
onBeforeUnmount(() => {
  cancelAnimationFrame(frame ?? 0);
  clearTimeout(timer);
  clearTimeout(peekTimer);
});
</script>

<template>
  <div
    :class="clsx(
      'celeste-mochi',
      peek && `celeste-mochi-peek-${peek}`,
      props.thinking && 'celeste-mochi-thinking',
      props.class,
    )"
    :data-anim="anim || undefined"
    aria-hidden="true"
  >
    <div class="celeste-mochi-stage">
      <div class="celeste-mochi-chan">
        <div class="celeste-mochi-body" @click="poke" />
        <div class="celeste-mochi-eyes">
          <div class="celeste-mochi-eye celeste-mochi-eye-l" />
          <div class="celeste-mochi-eye celeste-mochi-eye-r" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/*
 * The mascot is a brand mark: it keeps its colours in dark mode, so it uses
 * brand primitives and static white rather than semantic tokens. Choreography
 * timings are paired with the timers in the script and stay literal.
 */
.celeste-mochi {
  --mochi-size: v-bind('sizePx');
  --mochi-rotate: v-bind('rotate');

  position: relative;
  flex: none;
  width: var(--mochi-size);
  height: var(--mochi-size);
  overflow: hidden;
  border-radius: calc(var(--mochi-size) * 0.2222);
  background: linear-gradient(180deg, var(--color-brand-300) 0%, #f90171 100%);
  isolation: isolate;
}

.celeste-mochi::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 max(1px, calc(var(--mochi-size) * 0.0278)) var(--color-brand-200);
  pointer-events: none;
}

.celeste-mochi > * {
  position: absolute;
}

.celeste-mochi-stage {
  inset: 0;
  transform: rotate(var(--mochi-rotate));
}

.celeste-mochi-chan {
  position: absolute;
  top: 24%;
  left: -15%;
  width: 129.4%;
  height: 140.9%;
  transition: transform 0.38s cubic-bezier(0.3, -0.4, 0.7, 0.2);
}

.celeste-mochi-body {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-brand-400);
  box-shadow:
    inset 0 calc(var(--mochi-size) * 0.242) calc(var(--mochi-size) * 0.4015) rgb(255 255 255 / 80%),
    inset 0 calc(var(--mochi-size) * 0.363) calc(var(--mochi-size) * 0.2826) var(--color-brand-300);
}

.celeste-mochi-eyes {
  --eye-top: 12.8%;
  --eye-h: 19.4%;

  position: absolute;
  transform-origin: 50% calc(var(--eye-top) + var(--eye-h) / 2);
  transition: transform 0.7s ease-in-out;
  pointer-events: none;
  inset: 0;
}

.celeste-mochi-eye {
  position: absolute;
  top: var(--eye-top);
  width: 13.6%;
  height: var(--eye-h);
  overflow: hidden;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--color-static-white) 0%, rgb(255 255 255 / 60%) 100%);
  filter: drop-shadow(0 calc(var(--mochi-size) * 0.0305) calc(var(--mochi-size) * 0.0153) var(--color-pink-500));
}

.celeste-mochi-eye-l {
  left: 31.5%;
}

.celeste-mochi-eye-r {
  right: 31.5%;
}

.celeste-mochi-peek-drop .celeste-mochi-eye,
.celeste-mochi-peek-hidden .celeste-mochi-eye,
.celeste-mochi-peek-out .celeste-mochi-eye {
  height: calc(var(--eye-h) * 80 / 112);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.celeste-mochi-peek-drop .celeste-mochi-eye {
  animation: celeste-mochi-squint 0.25s ease-in-out 1s both;
}

.celeste-mochi[data-anim='blink-twice'] .celeste-mochi-eye,
.celeste-mochi[data-anim='look-blink-twice'] .celeste-mochi-eye {
  animation: celeste-mochi-blink-twice 3.5s linear both;
}

.celeste-mochi[data-anim='blink-once'] .celeste-mochi-eye,
.celeste-mochi[data-anim='look-blink-once'] .celeste-mochi-eye {
  animation: celeste-mochi-blink-once 3.5s linear both;
}

.celeste-mochi[data-anim='look-blink-twice'] .celeste-mochi-eyes {
  animation: celeste-mochi-look-after-blink-twice 3.5s linear both;
}

.celeste-mochi[data-anim='look-blink-once'] .celeste-mochi-eyes {
  animation: celeste-mochi-look-after-blink-once 3.5s linear both;
}

.celeste-mochi-thinking .celeste-mochi-eyes {
  transform: translate(3.77%, -3.118%) rotate(-7deg);
  transition: transform 0.6s ease-out;
}

.celeste-mochi-thinking .celeste-mochi-eye {
  animation: celeste-mochi-blink-twice 3.5s linear 1s infinite;
}

.celeste-mochi-peek-drop .celeste-mochi-chan {
  animation: celeste-mochi-drop 2.01s linear both;
}

.celeste-mochi-peek-hidden .celeste-mochi-chan {
  transform: translateY(calc(var(--mochi-size) * 0.754));
}

.celeste-mochi-peek-out .celeste-mochi-chan {
  transform: translateY(calc(var(--mochi-size) * 0.295));
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.celeste-mochi-peek-home .celeste-mochi-chan {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-reduced-motion: reduce) {
  .celeste-mochi * {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
  }
}

@keyframes celeste-mochi-blink-twice {
  0%,
  4.57%,
  8% {
    top: var(--eye-top);
    height: var(--eye-h);
    animation-timing-function: ease-in;
  }

  2.29%,
  10.29% {
    top: calc(var(--eye-top) + var(--eye-h) / 2);
    height: 0;
    animation-timing-function: ease-out;
  }

  12.57%,
  100% {
    top: var(--eye-top);
    height: var(--eye-h);
  }
}

@keyframes celeste-mochi-blink-once {
  0% {
    top: var(--eye-top);
    height: var(--eye-h);
    animation-timing-function: ease-in;
  }

  2.29% {
    top: calc(var(--eye-top) + var(--eye-h) / 2);
    height: 0;
    animation-timing-function: ease-out;
  }

  4.57%,
  100% {
    top: var(--eye-top);
    height: var(--eye-h);
  }
}

@keyframes celeste-mochi-look-after-blink-twice {
  0%,
  14.29% {
    transform: translate(0, 0);
    animation-timing-function: ease-out;
  }

  22.86%,
  42.86% {
    transform: translate(3.393%, 1.386%);
    animation-timing-function: ease-in-out;
  }

  54.29%,
  74.29% {
    transform: translate(-3.393%, 1.386%);
    animation-timing-function: ease-in-out;
  }

  85.71%,
  100% {
    transform: translate(0, 0);
  }
}

@keyframes celeste-mochi-look-after-blink-once {
  0%,
  8.57% {
    transform: translate(0, 0);
    animation-timing-function: ease-out;
  }

  17.14%,
  37.14% {
    transform: translate(3.393%, 1.386%);
    animation-timing-function: ease-in-out;
  }

  48.57%,
  68.57% {
    transform: translate(-3.393%, 1.386%);
    animation-timing-function: ease-in-out;
  }

  80%,
  100% {
    transform: translate(0, 0);
  }
}

@keyframes celeste-mochi-squint {
  from {
    height: var(--eye-h);
    border-bottom-right-radius: var(--radius-full);
    border-bottom-left-radius: var(--radius-full);
  }

  to {
    height: calc(var(--eye-h) * 80 / 112);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}

@keyframes celeste-mochi-drop {
  0% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.43, -0.3, 0.74, 0.33);
  }

  21.4% {
    transform: translateY(calc(var(--mochi-size) * -0.0082));
    animation-timing-function: cubic-bezier(0.3, -0.05, 0.7, -0.5);
  }

  44.28%,
  68.15% {
    transform: translateY(calc(var(--mochi-size) * 0.754));
    animation-timing-function: linear(
      0,
      0.048,
      0.168,
      0.326,
      0.497,
      0.66,
      0.804,
      0.921,
      1.009,
      1.068,
      1.103,
      1.118,
      1.118,
      1.107,
      1.089,
      1.069,
      1.049,
      1.031,
      1.015,
      1.003,
      0.995,
      0.989,
      0.986,
      0.986,
      0.987,
      0.988,
      0.991,
      0.993,
      0.995,
      0.997,
      0.999,
      1,
      1.001,
      1.002,
      1.002,
      1.002,
      1.001,
      1.001,
      1.001,
      1.001,
      1
    );
  }

  100% {
    transform: translateY(calc(var(--mochi-size) * 0.295));
  }
}
</style>
