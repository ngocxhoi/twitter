<template>
  <div
    class="m-2 overflow-hidden border rounded-2xl bg-gray-50 dark:bg-dim-700 border-gray-200 dark:border-gray-700"
  >
    <h1
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white border-gray-200 dark:border-gray-700"
    >
      {{ props.title }}
    </h1>

    <slot></slot>

    <div
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 transition-colors ease-in-out duration-300"
    >
      Show more
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
