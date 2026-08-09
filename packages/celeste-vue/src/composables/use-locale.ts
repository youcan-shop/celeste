import type { Ref } from 'vue';
import { ref } from 'vue';

const locale = ref(typeof navigator === 'undefined' ? 'en-US' : navigator.language);

export function useLocale(): Ref<string> {
  return locale;
}
