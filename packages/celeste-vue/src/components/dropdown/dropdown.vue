<script setup lang="ts">
import clsx from 'clsx';
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from 'radix-vue';
import { ref } from 'vue';
import TextInput from '../input/text-input.vue';
import DropdownItem from './dropdown-item.vue';

const props = withDefaults(defineProps<Dropdown>(), {
  disabled: false,
  placeholder: 'Placeholder',
  size: 'sm',
  type: 'normal',
});

const searched = ref('');
const isFocused = ref(false);
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple', 'りんご', 'Pineapple', 'Pineapple', 'Pineapple', 'Pineapple'];
</script>

<script lang="ts">
export interface Dropdown {
  type: 'normal' | 'compact' | 'inline' | 'compact-inline';
  disabled: boolean;
  icon?: string;
  placeholder: string;
  error?: boolean;
}
</script>

<template>
  <div class="celeste-dropdown-wrapper">
    <ComboboxRoot
      v-model="searched"
      :disabled="disabled"
      class="celeste-dropdown-root"
    >
      <ComboboxAnchor
        :class="clsx(
          'celeste-dropdown-anchor',
          `celeste-dropdown-anchor-${props.type}`,
          { 'celeste-dropdown-anchor-error': props.error },
          { 'celeste-dropdown-anchor-disabled': props.disabled },
          { 'celeste-dropdown-anchor-focused': isFocused },
          { 'celeste-dropdown-anchor-filled': searched },
        )"
        tabindex="0"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <i :class="icon" />
        <!-- <ComboboxInput
          disabled
          :placeholder="placeholder"
          :value="searched"
        /> -->
        <ComboboxTrigger
          as="span"
          :disabled="disabled"
          class="celeste-dropdown-input"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          {{ searched.length === 0 ? placeholder : searched }}
        </ComboboxTrigger>
        <ComboboxTrigger
          :disabled="disabled"
          class="celeste-dropdown-trigger"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <i class="i-celeste-arrow-down-s-line" />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent class="celeste-dropdown-content">
        <ComboboxViewport>
          <ComboboxEmpty />

          <ComboboxGroup class="celeste-dropdown-items-group">
            <ComboboxInput as-child>
              <TextInput
                v-model="searched"
                type="search"
                size="sm"
                placeholder="Search"
                @focus="isFocused = true"
                @blur="isFocused = false"
              >
                <template #prefix>
                  <i class="i-celeste-search-2-line" />
                </template>
                <template v-if="isFocused" #suffix>
                  <div
                    @click="() => searched = ''"
                  >
                    <i class="i-celeste-close-line" />
                  </div>
                </template>
              </TextInput>
            </ComboboxInput>
            <ComboboxSeparator class="celeste-dropdown-separator" />
            <ComboboxItem
              v-for="(option, index) in options"
              :key="index"
              class="celeste-dropdown-item"
              :value="option"
            >
              <div>
                <DropdownItem :label="option" />
              </div>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>

<style lang="scss" scoped>
@mixin icon-size {
  width: 20px;
  height: 20px;
}

@mixin transition-default {
  transition-property: background-color, transform;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
}

* {
  box-sizing: border-box;
}

.celeste-dropdown-wrapper {
  --dropdown-width: 100%;
  --dropdown-height: 300px;

  position: relative;

  &:deep(.celeste-dropdown-root) {
    display: flex;
    position: relative;
    flex-direction: column;
    width: var(--dropdown-width);
    padding-top: var(--spacing-4);
    gap: var(--spacing-10);
  }

  .celeste-dropdown-anchor {
    @include transition-default;

    display: flex;
    align-items: center;
    padding: var(--spacing-10);
    border: 1px solid var(--color-stroke-soft-200);
    border-radius: var(--radius-10);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-xs);
    gap: var(--spacing-8);

    i {
      @include icon-size;

      color: var(--color-icon-soft-400);
    }

    .celeste-dropdown-input {
      flex: 1 0 0;
      background: inherit;
      color: var(--color-text-sub-600);
      font: var(--paragraph-sm);
      cursor: pointer;
    }

    .celeste-dropdown-trigger {
      @include transition-default;

      display: flex;
      place-items: center center;
      border: none;
      background: none;
      color: var(--color-icon-soft-400);
      cursor: pointer;
    }

    &:hover {
      background: var(--color-bg-weak-50);
    }

    &-error {
      border: 1px solid var(--color-state-error-base);
    }

    &-disabled {
      background: var(--color-bg-weak-50);
      color: var(--color-text-disabled-300);

      .celeste-dropdown-input {
        color: var(--color-text-disabled-300);
      }

      i,
      .celeste-dropdown-trigger {
        color: var(--color-icon-disabled-300);
      }
    }

    &-focused {
      border: 1px solid var(--color-stroke-strong-950);
      box-shadow: var(--shadow-buttons-important-focus);
      color: var(--color-text-strong-950);

      .celeste-dropdown-input {
        color: var(--color-text-strong-950);
      }

      i {
        color: var(--color-icon-strong-950);
      }

      .celeste-dropdown-trigger {
        @include transition-default;

        transform: rotate(180deg);
      }
    }

    &-filled {
      color: var(--color-text-strong-950);
    }
  }

  .celeste-dropdown-content {
    display: flex;
    position: absolute;
    z-index: 99;
    top: calc(var(--dropdown-width) + var(--spacing-4));
    left: 0;
    flex-direction: column;
    width: var(--dropdown-width);
    max-height: var(--dropdown-height);
    padding: var(--spacing-8);
    overflow: hidden;
    border-radius: var(--radius-16);
    background-color: var(--color-bg-white-0);
    box-shadow: var(--shadow-regular-md);
    gap: var(--spacing-4);
  }

  &:deep(.celeste-input-wrapper .celeste-input-prefix) {
    @include icon-size;

    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: var(--color-icon-sub-600);
  }

  &:deep(.celeste-input-wrapper) {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  &:deep(.celeste-input-wrapper:focus-within) {
    border: none;
    box-shadow: none;
  }

  .celeste-dropdown-items-group {
    display: flex;
    flex-direction: column;
    background: var(--color-bg-white-0);
    gap: var(--spacing-4);
  }

  &:deep(.celeste-input-wrapper .celeste-input-suffix) {
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    cursor: pointer;

    i {
      @include icon-size;

      color: var(--color-icon-soft-400);
    }
  }

  .celeste-dropdown-separator {
    width: 100%;
    height: 1px;
    background-color: var(--color-stroke-soft-200);
  }
}
</style>
