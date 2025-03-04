<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { ref } from 'vue';

const v = ref('');
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple', 'りんご'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];
</script>

<template>
  <ComboboxRoot
    v-model="v"
    class="relative"
  >
    <ComboboxAnchor>
      <ComboboxInput
        placeholder="Placeholder..."
      />
      <ComboboxTrigger>
        <i class="i-celeste-information-fill" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent>
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty />

        <ComboboxGroup>
          <ComboboxLabel>
            Fruits
          </ComboboxLabel>

          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            class=""
            :value="option"
          >
            <ComboboxItemIndicator>
              <i class="i-celeste-information-fill" />
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
          <ComboboxSeparator />
        </ComboboxGroup>

        <ComboboxGroup>
          <ComboboxLabel>
            Vegetables
          </ComboboxLabel>
          <ComboboxItem
            v-for="(option, index) in vegetables"
            :key="index"
            class=""
            :value="option"
          >
            <ComboboxItemIndicator
              class=""
            >
              <i class="i-celeste-information-fill" />
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
