<script setup lang="ts">
import DropdownItem from '@/components/dropdown/dropdown-item.vue';
import DropdownRoot from '@/components/dropdown/dropdown-root.vue';
</script>

<template>
  <div class="hi">
    hallo
    <DropdownRoot>
      <DropdownItem :value="1" />
    </DropdownRoot>
  </div>
</template>

<style>
html {
  color: var(--color-text-strong-950);
  font: var(--typo-paragraph-latin-medium);
}
</style>
