<template>
  <div>
    <TweetItem :tweet="props.tweet" />

    <TweetForm
      placeholder="Tweet your reply"
      :reply-to="props.tweet"
      :user="props.user"
      @onSuccess="handleFormSuccess"
    />

    <TweetListReplies :tweets="replies" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  user: {
    type: Object as any,
    required: true,
  },
});
const emits = defineEmits(["refreshTweet"]);

const { getTweetById } = useTweets();

const replies = computed(() => props.tweet?.replies || []);

async function handleFormSuccess() {
  emits("refreshTweet");
}
</script>
