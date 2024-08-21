<template>
  <div class="border-x border-gray-200 dark:border-gray-700">
    <div
      class="sticky z-50 top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80"
    >
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        {{ title }}
      </h2>
    </div>

    <div
      v-if="loading"
      class="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <svg
        fill="none"
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
        class="animate-spin text-gray-500 dark:text-gray-400"
      >
        <path
          d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
          stroke="#605afa"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        />
      </svg>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
const { loading, title } = toRefs(props);
</script>
