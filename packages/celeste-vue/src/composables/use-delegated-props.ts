import { computed, type ComputedRef } from 'vue';

export function useDelegatedProps<
  T extends Record<string, any>,
  K extends keyof T,
>(
  props: T,
  excludeKeys: K | K[] = ['class'] as K[],
): ComputedRef<Omit<T, K>> {
  return computed(() => {
    const keysToExclude = Array.isArray(excludeKeys) ? excludeKeys : [excludeKeys];
    const delegated = { ...props } as T;

    keysToExclude.forEach((key) => {
      delete delegated[key];
    });

    return delegated as Omit<T, K>;
  });
}
