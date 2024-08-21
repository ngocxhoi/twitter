<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <div
      v-else
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 border-white dark:border-gray-700 transition ease-in-out duration-350"
      v-for="tweet in props.tweets"
      :key="tweet.id"
      @click.native="redirect(tweet.id)"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  tweets: {
    type: Array<any>,
    required: true,
  },
});

const isEmptyArray = computed(() => props.tweets?.length === 0);

function redirect(tweetId: string) {
  navigateTo(`/status/${tweetId}`);
}
</script>
