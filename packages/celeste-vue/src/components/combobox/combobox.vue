<script setup lang="ts">
import { type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits } from 'radix-vue';
import { computed, ref } from 'vue';
import Badge, { type BadgeProps } from '../badge/badge.vue';
import ComboboxAnchor from './combobox-anchor.vue';
import ComboboxEmpty from './combobox-empty.vue';
import ComboboxGroup from './combobox-group.vue';
import ComboboxInput from './combobox-input.vue';
import ComboboxItem, { type ComboboxItemPropsType } from './combobox-item.vue';
import ComboboxList from './combobox-list.vue';
import ComboboxRoot from './combobox-root.vue';
import ComboboxSeparator from './combobox-separator.vue';
import ComboboxTrigger from './combobox-trigger.vue';

const props = withDefaults(defineProps<ComboboxPropsType>(), {
  placeholder: 'Select',
  size: 'sm',
});
const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
  const { open, modelValue, filterFunction, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const selected = ref<ComboboxItemPropsType[] | ComboboxItemPropsType | undefined>(props.multiple ? [] : undefined);

function isSelected(value: ComboboxItemPropsType['value']): boolean | undefined {
  if (!Array.isArray(selected.value) || !props.multiple)
    return;

  if (value === undefined || value === null)
    return false;

  return selected.value.some((selectedItem: ComboboxItemPropsType) => {
    const { value: selectedValue } = selectedItem;

    if (
      props.valueBy
      && Object.prototype.hasOwnProperty.call(value, props.valueBy)
      && Object.prototype.hasOwnProperty.call(selectedValue, props.valueBy)) {
      return (value as Record<string, any>)[props.valueBy] === (selectedValue as Record<string, any>)[props.valueBy];
    }

    return selectedValue === value;
  });
}

function filterFunction(list: any[], searchTerm: string) {
  return list.filter((option: ComboboxItemPropsType) => {
    const { value, label } = option;

    if (!value || !label)
      return false;

    if (
      props.valueBy
      && typeof value === 'object'
      && props.valueBy in value) {
      return String(value[props.valueBy]).toLowerCase().includes(searchTerm.toLowerCase())
        || label.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }

    return value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      || label.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
}

const mergedBadgeProps = computed(() => ({
  ...props.badgeProps,
  disabled: props.disabled,
}));
</script>

<script lang="ts">
export interface ComboboxPropsType extends ComboboxRootProps {
  options: ComboboxItemPropsType[];
  valueBy?: string;
  placeholder?: string;
  type?: 'normal' | 'compact' | 'inline' | 'compact-input';
  size?: 'xs' | 'sm' | 'md';
  emptyLabel?: string;
  badgeProps?: BadgeProps;
  searchable?: boolean;
}
</script>

<template>
  <div class="root">
    <ComboboxRoot
      v-bind="forwarded"
      v-model:model-value="selected"
      :filter-function="filterFunction"
    >
      <ComboboxAnchor>
        <ComboboxInput :disabled="disabled">
          <template #default>
            <ComboboxTrigger
              :type="type"
              :filled="Boolean(selected)"
              :size="size"
            >
              <!-- Prefix - Icon & Image - -->
              <div class="celeste-dropdown-anchor-trigger-prefix">
                <div v-if="selected && !Array.isArray(selected)" class="celeste-dropdown-anchor-trigger-prefix-selected">
                  <i v-if="selected.icon" :class="selected.icon" />
                  <div v-if="selected.image">
                    <slot name="image" v-bind="{ selected }">
                      <img
                        :src="selected.image"
                        alt="Selected option"
                        class="selected-dropdown-image"
                      >
                    </slot>
                  </div>
                </div>
                <slot
                  v-else
                  name="prefix"
                  class="celeste-dropdown-anchor-trigger-prefix-default"
                />
              </div>

              <!-- Selected value  -->
              <div
                v-if="type !== 'inline'"
                class="celeste-dropdown-input"
              >
                <span v-if="multiple">{{ placeholder }}</span>
                <span v-else>
                  {{ selected && !Array.isArray(selected) ? selected.label : props.placeholder }}
                </span>
                <span v-if="mergedBadgeProps && badgeProps" class="celeste-input-badge">
                  <Badge v-bind="mergedBadgeProps" />
                </span>
              </div>
              <div class="celeste-dropdown-trigger">
                <i class="i-celeste-arrow-down-s-line" />
              </div>
            </ComboboxTrigger>
          </template>
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxList>
        <div v-if="searchable" class="celeste-dropdown-inner-input">
          <ComboboxInput />
          <ComboboxSeparator />
        </div>

        <ComboboxEmpty>
          <template v-if="emptyLabel" #default>
            {{ emptyLabel }}
          </template>
        </ComboboxEmpty>

        <ComboboxGroup>
          <ComboboxItem
            v-for="option in props.options"
            :key="option.label"
            :label="option.label"
            :sublabel="option.sublabel"
            :description="option.description"
            :checkbox="props.multiple"
            :value="option"
            :selected="isSelected(option.value)"
          >
            <template #prefix>
              <i v-if="option.icon" :class="option.icon" />
              <img
                v-if="option.image"
                :src="option.image"
                alt="option"
                class="celeste-dropdown-item-image"
              >
            </template>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxRoot>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.celeste-dropdown-anchor-trigger-prefix {
  display: flex;
  align-items: center;
  justify-content: center;

  &-selected {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.celeste-dropdown-item-image,
.selected-dropdown-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: var(--radius-full);
}

.celeste-dropdown-input {
  display: flex;
  flex: 1 0 0;
  align-items: center;
  justify-content: space-between;
  background: inherit;
  color: var(--color-text-sub-600);
  font: var(--paragraph-sm);
  cursor: pointer;
  gap: var(--spacing-8);
}

.celeste-dropdown-trigger {
  display: flex;
  place-items: center center;
  transition-property: transform;
  transition-duration: var(--animation-fast);
  transition-timing-function: ease-out;
  border: none;
  background: none;
  color: var(--color-icon-soft-400);
  cursor: pointer;
}

.celeste-dropdown-inner-input {
  display: flex;
  position: sticky;
  z-index: 50;
  top: 0;
  flex-direction: column;
  gap: var(--spacing-4);
  background-color: var(--color-bg-white-0);
}
</style>
