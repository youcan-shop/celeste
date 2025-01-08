<script setup lang="ts">
import CommandGroup from '@/components/command/command-group.vue';
import CommandInput from '@/components/command/command-input.vue';
import CommandItem from '@/components/command/command-item.vue';
import CommandList from '@/components/command/command-list.vue';
import CommandRoot from '@/components/command/command-root.vue';
import CommandSeparator from '@/components/command/command-separator.vue';
import ScrollArea from '@/components/scroll-area/scroll-area.vue';
</script>

<template>
  <div class="hi">
    <CommandRoot class="w-[300px]">
      <CommandInput placeholder="Search.." />
      <CommandSeparator />
      <CommandList>
        <ScrollArea class="h-[300px]">
          <CommandGroup heading="Support">
            <CommandItem :value="1">
              One
            </CommandItem>
            <CommandItem :value="2">
              One
            </CommandItem>
            <CommandItem :value="3">
              One
            </CommandItem>
            <CommandItem :value="4">
              One
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Sadgeness">
            <CommandItem :value="5">
              One
            </CommandItem>
            <CommandItem :value="6">
              One
            </CommandItem>
            <CommandItem :value="7">
              One
            </CommandItem>
            <CommandItem :value="8">
              One
            </CommandItem>
            <CommandItem :value="9">
              One
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandRoot>
  </div>
</template>

<style>
html {
  @apply antialiased;

  font: var(--paragraph-md);
  color: var(--color-text-strong-950);
  background: var(--color-bg-weak-50);
  display: grid;
  place-items: center;
  min-height: 100svh;
}
</style>
