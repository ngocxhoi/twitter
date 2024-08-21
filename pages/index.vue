<template>
  <MainSection title="Home" :loading="loading">
    <div class="border-b">
      <TweetForm :user="user" @onSuccess="handleCreateTweet" />
    </div>

    <TweetListFeed :tweets="homeTweets" />

    <!-- <div>
      <ColorSwitcher />
    </div> -->
  </MainSection>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Home",
});

const { getUser, useAuthUser, useAuthToken } = useAuth();
const { getTweets, postTweet } = useTweets();

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
const homeTweets = ref();

const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  const token = useAuthToken().value as string;
  try {
    const tweets = await getTweets(token);

    // @ts-ignore
    homeTweets.value = tweets.tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

function handleCreateTweet(tweet: any) {
  loading.value = true;
  const token = useAuthToken().value as string;
  try {
    setTimeout(async () => {
      const tweets = await getTweets(token);

      // @ts-ignore
      homeTweets.value = tweets.tweets;
    }, 1000);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
  navigateTo(`/status/${tweet?.tweet?.id}`);
}
</script>
