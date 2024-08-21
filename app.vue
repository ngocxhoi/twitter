<template>
  <div
    :class="{ dark: darkMode }"
    class="[&>*]:transition-colors [&>*]duration-300"
  >
    <div class="bg-white dark:bg-dim-900">
      <Loading v-if="isAuthLoading" />

      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>

          <!-- Main Content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage keepalive />
          </main>

          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const darkMode = ref(false);
const appConfig = useAppConfig();
const { useAuthUser, useAuthToken, useAuthLoading, initAuth } = useAuth();

useHead({
  titleTemplate(title): any {
    return title ? `${title} / ${appConfig.title}` : appConfig.title;
  },
});

onBeforeMount(() => {
  initAuth();
});

const isAuthLoading = useAuthLoading();
const user = useAuthUser();
</script>
