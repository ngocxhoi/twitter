<template>
  <MainSection title="Profile" :loading="isLoading">
    <div class="max-w-full flex items-start overflow-hidden py-10">
      <img :src="user?.profileImage" class="w-24 rounded-full" alt="Avatar" />
      <div class="ml-4 flex flex-col justify-center">
        <h1 class="font-bold text-2xl">{{ user?.name }}</h1>
        <p class="text-gray-600">{{ user?.email }}</p>
      </div>
      <div
        @click="handleLogout"
        class="ml-4 mt-4 flex items-center cursor-pointer hover:bg-red-300 rounded-xl p-1 transition-colors duration-300"
      >
        <Icon name="i-heroicons-arrow-right-start-on-rectangle" size="24" />
        <span class="ml-1">Logout</span>
      </div>
    </div>

    <div class="flex w-full gap-4">
      <div
        @click="typeTweets = 'Tweets'"
        :class="{
          'bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600':
            typeTweets == 'Tweets',
        }"
        class="cursor-pointer w-1/3 text-xl font-semibold py-4 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
      >
        Tweets
      </div>
      <div
        @click="typeTweets = 'Loved'"
        :class="{
          'bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600':
            typeTweets == 'Loved',
        }"
        class="cursor-pointer w-1/3 text-xl font-semibold py-4 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
      >
        Loved
      </div>
      <div
        @click="typeTweets = 'Shared'"
        :class="{
          'bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600':
            typeTweets == 'Shared',
        }"
        class="cursor-pointer w-1/3 text-xl font-semibold py-4 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
      >
        Shared
      </div>
    </div>

    <div class="grid grid-cols-3 w-full h-full gap-4">
      <div
        v-if="tweetsLoading"
        class="h-10 w-full flex items-center justify-center"
      >
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>

      <div
        v-for="el in userTweets?.tweets"
        class="col-span-1 overflow-hidden rounded cursor-pointer"
      >
        <img
          :src="el.mediaFiles[0]?.url"
          alt=""
          class="object-cover w-full h-60 hover:scale-105 transition-transform duration-300"
          @click="redirect(el.id)"
        />
      </div>
    </div>
  </MainSection>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Profile",
});

const { useAuthUser, useAuthToken, logout } = useAuth();
const { getTweets } = useTweets();

const user = ref();
const isLoading = ref(false);
const tweetsLoading = ref(false);
const userTweets = ref();
const typeTweets = ref("Tweets");

onBeforeMount(async () => {
  tweetsLoading.value = true;
  user.value = useAuthUser().value;
  console.log("User :" + useAuthUser().value);

  try {
    let data = await getTweets(useAuthToken().value as string, {
      authorId: user.value?.id,
    });

    userTweets.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    tweetsLoading.value = false;
  }
});

function redirect(tweet: string) {
  navigateTo(`/status/${tweet}`);
}

async function handleLogout() {
  if (confirm("Are you sure you want to log out")) {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    } finally {
      navigateTo("/");
    }
  }
}
</script>
