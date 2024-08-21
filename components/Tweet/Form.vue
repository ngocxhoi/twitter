<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <Loading />
    </div>
    <div v-else>
      <TweetItem
        :tweet="props.replyTo"
        v-if="props.replyTo && props.showReply"
        hideActions
      />
      <TweetInput
        :placeholder="props.placeholder"
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { useAuthToken } = useAuth();
const emits = defineEmits(["onSuccess"]);
const loading = ref(false);
const { postTweet } = useTweets();

const props = defineProps({
  user: {
    type: Object as any,
    required: true,
  },
  placeholder: {
    type: String,
    default: "What's happening ?",
  },
  replyTo: {
    type: Object,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false,
  },
});

async function handleFormSubmit(data: any) {
  loading.value = true;

  let formData = new FormData();
  formData.append("text", data.text);

  if (data.mediaFiles !== null && data.mediaFiles !== undefined) {
    formData.append("image", data.mediaFiles);
  }

  if (
    props.replyTo &&
    props.replyTo.id !== null &&
    props.replyTo.id !== undefined
  ) {
    formData.append("replyTo", props.replyTo.id);
  }

  try {
    const tweet = await postTweet(formData, useAuthToken().value);

    // @ts-ignore
    if (tweet?.tweet) {
      emits("onSuccess", tweet);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
