<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ButtonGroup, ButtonGroupItem } from '../components/button-group';

const buttons = [
  { value: 'like', label: 'Like', leadingIcon: 'arrow-drop-left-line', trailingIcon: 'arrow-drop-right-line' },
  { value: 'comment', label: 'Comment', leadingIcon: 'arrow-drop-left-line', trailingIcon: 'arrow-drop-right-line' },
  { value: 'share', label: 'Share', leadingIcon: 'arrow-drop-left-line', trailingIcon: 'arrow-drop-right-line' },
];

const selectedVal = ref<string | undefined>('comment');

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(selectedVal.value);
});
</script>

<template>
  <div class="hi">
    <ButtonGroup
      v-model="selectedVal"
      type="single"
    >
      <ButtonGroupItem
        v-for="button in buttons"
        :key="button.value"
        :value="button.value"
        size="xxs"
      >
        <i :class="`i-celeste-${button.leadingIcon}`" />
        {{ button.label }}
        <i :class="`i-celeste-${button.trailingIcon}`" />
      </ButtonGroupItem>
    </ButtonGroup>
  </div>
</template>

<style>
html {
  @apply antialiased;

  display: grid;
  min-height: 100svh;
  background: var(--color-bg-weak-50);
  color: var(--color-text-strong-950);
  font: var(--paragraph-md);
  place-items: center;
}
</style>
