import type { Ref } from 'vue';
import { ref } from 'vue';

const locale = ref('en-US');

export function useLocale(): Ref<string> {
  return locale;
}
