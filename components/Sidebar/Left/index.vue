<template>
  <div class="flex flex-col h-screen">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20 transition ease-in-out duration-300"
    >
      <NuxtLink to="/">
        <div class="size-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab
        v-for="link in links"
        :to="link.to"
        :active="linkName == link.to"
      >
        <template v-slot:icon>
          <Icon
            :name="linkName == link.name ? link.icon + '-solid' : link.icon"
            class="size-6"
          />
        </template>
        <template v-slot:name> {{ link.name }} </template>
      </SidebarLeftTab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { links } from "~/assets/ts/links";

const linkName = ref("/");

watch(
  () => useRoute().path,
  () => (linkName.value = useRoute().path)
);
</script>
