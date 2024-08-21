<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <TweetDetails
        :user="user"
        :tweet="tweet.tweet"
        @refreshTweet="handleRefreshTweet"
      />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
const loading = ref(false);
const tweet = ref();
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();
const idParam = ref();

watch(
  () => useRoute().fullPath,
  () => getTweet()
);

onBeforeMount(() => {
  idParam.value = useRoute().params.id;
});

async function getTweet() {
  loading.value = true;
  try {
    const tweetData = await getTweetById(idParam.value);

    tweet.value = tweetData;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getTweet();
});

async function handleRefreshTweet() {
  try {
    const tweetData = await getTweetById(idParam.value);

    tweet.value = tweetData;
  } catch (error) {
    console.log(error);
  }
}
</script>
