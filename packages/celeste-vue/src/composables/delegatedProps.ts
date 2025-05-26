import { computed, type ComputedRef } from 'vue';

export function useDelegatedProps(props: any, excludeKeys: string | string[] = ['class']): ComputedRef<any> {
  return computed(() => {
    const keysToExclude = Array.isArray(excludeKeys) ? excludeKeys : [excludeKeys];
    const delegated = { ...props };
    keysToExclude.forEach(key => delete delegated[key]);

    return delegated;
  });
}
