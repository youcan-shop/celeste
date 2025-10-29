<script setup lang="ts">
import Button from '../button.vue';
</script>

<template>
  <Stories title="Components/Button" :component="Button">
    <Story title="Default">
      <Button size="md" intent="primary">
        Click me
      </Button>
    </Story>

    <Story title="Small">
      <Button size="sm" intent="primary">
        Click me
      </Button>
    </Story>

    <Story title="ExtraSmall">
      <Button size="xs" intent="primary">
        Click me
      </Button>
    </Story>

    <Story title="Disabled">
      <Button
        size="md"
        intent="primary"
        disabled
      >
        Click me
      </Button>
    </Story>

    <Story title="AllSizes">
      <div class="flex flex-wrap items-center gap-4">
        <Button size="xxs" intent="primary">
          XXS
        </Button>
        <Button size="xs" intent="primary">
          XS
        </Button>
        <Button size="sm" intent="primary">
          SM
        </Button>
        <Button size="md" intent="primary">
          MD
        </Button>
      </div>
    </Story>

    <Story title="AllIntents">
      <div class="flex flex-wrap gap-4">
        <Button intent="primary">
          Primary
        </Button>
        <Button intent="neutral">
          Neutral
        </Button>
        <Button intent="error">
          Error
        </Button>
      </div>
    </Story>

    <Story title="WithIcon">
      <Button intent="primary" size="md">
        Continue
        <i class="i-celeste-arrow-right-s-line" />
      </Button>
    </Story>

    <Story title="AllVariants">
      <div class="flex flex-wrap gap-4">
        <Button variant="fill" intent="primary">
          Fill
        </Button>
        <Button variant="stroke" intent="primary">
          Stroke
        </Button>
        <Button variant="lighter" intent="primary">
          Lighter
        </Button>
        <Button variant="ghost" intent="primary">
          Ghost
        </Button>
      </div>
    </Story>
  </Stories>
</template>

<docs lang="md">
import { Canvas } from '@storybook/addon-docs/blocks';

# Button

Displays a button or a component that looks like a button.

### Default

<Canvas of={Default} />

### Sizes

<Canvas of={Allsizes} />

### Intents

<Canvas of={Allintents} />

### Variants

<Canvas of={Allvariants} />

### With Icon

<Canvas of={Withicon} />

### Disabled

<Canvas of={Disabled} />
</docs>
