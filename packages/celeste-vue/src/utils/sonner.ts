import type { SonnerAlertProps } from '@/components/sonner/sonner-alert.vue';
import { markRaw } from 'vue';
import { type ExternalToast, toast as sonner } from 'vue-sonner';
import SonnerAlert from '@/components/sonner/sonner-alert.vue';

export interface ToastOptions extends ExternalToast {
  state?: SonnerAlertProps['state'];
  variant?: SonnerAlertProps['variant'];
  size?: SonnerAlertProps['size'];
  dismissable?: SonnerAlertProps['dismissable'];
}

function createToast(title: string, data?: ToastOptions): string | number {
  const {
    state = 'success',
    variant = 'stroke',
    size = 'lg',
    dismissable = true,
    ...externalToastProps
  } = data || {};

  let toastId: string | number;

  const dismissToast = (): void => {
    sonner.dismiss(toastId);
  };

  toastId = sonner.custom(markRaw(SonnerAlert), {
    ...externalToastProps,
    componentProps: {
      title,
      description: data?.description,
      state,
      variant,
      size,
      dismissable,
      onDismiss: dismissToast,
    },
  });

  return toastId;
}

export const toast = Object.assign(createToast, {
  success: (title: string, data?: Omit<ToastOptions, 'state'>): string | number => {
    return createToast(title, { ...data, state: 'success' });
  },

  error: (title: string, data?: Omit<ToastOptions, 'state'>): string | number => {
    return createToast(title, { ...data, state: 'error' });
  },

  warning: (title: string, data?: Omit<ToastOptions, 'state'>): string | number => {
    return createToast(title, { ...data, state: 'warning' });
  },

  info: (title: string, data?: Omit<ToastOptions, 'state'>): string | number => {
    return createToast(title, { ...data, state: 'information' });
  },

  feature: (title: string, data?: Omit<ToastOptions, 'state'>): string | number => {
    return createToast(title, { ...data, state: 'feature' });
  },

  dismiss: (id?: string | number): void => {
    sonner.dismiss(id);
  },

  loading: (title: string, data?: ExternalToast): string | number => {
    return sonner.loading(title, data);
  },
});
