<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UInput
        v-model="data.username"
        label="Username"
        placeholder="@username"
      />

      <UInput
        label="Password"
        placeholder="********"
        type="password"
        v-model="data.password"
      />

      <UButton
        @click="handleLogin"
        label="Log in"
        :disabled="isButtonDisabled"
        :loading="isLoading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const data = reactive({
  username: "han",
  password: "123123123",
});

let isLoading = ref(false);

async function handleLogin() {
  const { login } = useAuth();
  isLoading.value = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password;
});
</script>
