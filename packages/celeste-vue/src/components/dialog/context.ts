import type { Ref } from 'vue';
import { createContext } from 'reka-ui';

export const [injectDialogContext, provideDialogContext] = createContext<{ drawer: Ref<boolean> }>('Dialog');
