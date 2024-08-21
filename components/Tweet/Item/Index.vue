<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />

    <div :class="tweetBodyWrapper">
      <p
        class="flex-shrink w-auto font-medium text-gray-800 dark:text-white"
        :class="textSize"
      >
        {{ props.tweet.text }}
      </p>

      <div class="flex max-w-full my-3 mr-2 border-2 rounded-2xl flex-col">
        <img
          :src="props.tweet.mediaFiles[0]?.url"
          class="w-full rounded-2xl"
          @click.prevent.stop="openModal = true"
        />
        <UModal v-model="openModal">
          <img
            :src="props.tweet.mediaFiles[0]?.url"
            class="w-full rounded-2xl"
          />
          <UButton class="absolute bottom-0 right-0">
            <a :href="props.tweet.mediaFiles[0]?.url" download>
              <Icon name="i-heroicons-arrow-down-tray" />
            </a>
          </UButton>
        </UModal>
      </div>

      <div class="mt-2" v-if="!props.hideActions">
        <TweetItemActions
          :tweet="props.tweet"
          :compact="props.compact"
          @on-comment-click="handleCommentClick"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emitter = defineEmits(["replyTweet"]);

const props = defineProps({
  tweet: {
    type: Object as any,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  hideActions: {
    type: Boolean,
    default: false,
  },
});

const openModal = ref(false);

const tweetBodyWrapper = computed(() =>
  props.compact ? "ml-16" : "ml-2 mt-4"
);

const textSize = computed(() => (props.compact ? "text-base" : "text-2xl"));

function handleCommentClick() {
  emitter("replyTweet", props.tweet);
}
</script>
