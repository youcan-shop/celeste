<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ButtonGroup, ButtonGroupItem } from '../components/button-group';

const value = ref('ok1');

watchEffect(() => {
  // eslint-disable-next-line no-console
  console.log(value.value);
});
</script>

<template>
  <div class="hi">
    <ButtonGroup v-model="value" type="single">
      <ButtonGroupItem
        value="like"
        text="Like"
        icon-right="i-celeste-arrow-drop-right-line"
        icon-left="i-celeste-arrow-drop-left-line"
      />
      <ButtonGroupItem
        value="comment"
        text="Comment"
        icon-right="i-celeste-arrow-drop-right-line"
        icon-left="i-celeste-arrow-drop-left-line"
      />
      <ButtonGroupItem
        value="share"
        text="Share"
        icon-right="i-celeste-arrow-drop-right-line"
        icon-left="i-celeste-arrow-drop-left-line"
      />
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
