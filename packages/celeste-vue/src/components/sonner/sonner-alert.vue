<script setup lang="ts">
import { Alert, type AlertProps } from '../alert';

export interface SonnerAlertProps extends /* @vue-ignore */ Partial<AlertProps> {
  title: string;
  description?: string;
  onDismiss?: () => void;
}

const props = withDefaults(
  defineProps<SonnerAlertProps>(),
  {
    size: 'lg',
    variant: 'stroke',
    state: 'success',
    dismissable: true,
  },
);

function handleDismiss(): void {
  if (props.onDismiss) {
    props.onDismiss();
  }
}
</script>

<template>
  <Alert
    v-bind="props"
    class="sonner-alert"
    @dismiss="handleDismiss"
  >
    <template #title>
      {{ props.title }}
    </template>
    <template v-if="props.description" #description>
      {{ props.description }}
    </template>
  </Alert>
</template>

<style scoped>
.sonner-alert {
  width: min(360px, calc(100vw - 32px));
  min-width: 360px;
  max-width: 360px;
}

@media (width <= 400px) {
  .sonner-alert {
    min-width: calc(100vw - 32px);
  }
}
</style>
