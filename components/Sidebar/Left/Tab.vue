<template>
  <NuxtLink
    :to="to"
    class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white"
  >
    <div
      class="transition-[transform,color] duration-300"
      :class="{ 'scale-110 text-blue-400': active }"
    >
      <slot name="icon" />
    </div>

    <div
      class="hidden ml-4 text-xl xl:block transition-[font-weight,color] duration-300"
      :class="{ 'font-semibold text-blue-400': active }"
    >
      <slot name="name" />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "#",
  },
});

const { active, to } = toRefs(props);
</script>
