<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue';
import { ComboboxContent, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(), {
  dismissable: false,
});
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxContent
    v-bind="forwarded"
    class="celeste-command-list"
    :class="props.class"
  >
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>

<style>
.celeste-command-list {
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
