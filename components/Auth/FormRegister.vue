<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UInput v-model="data.email" label="Email" placeholder="email" />
      <UInput v-model="data.name" label="Username" placeholder="name" />
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
      <UInput
        label="Confirm Password"
        placeholder="********"
        type="password"
        v-model="data.passwordConfirm"
      />

      <UButton
        @click="handleRegister"
        label="Sign up"
        :disabled="isButtonDisabled"
        :loading="isLoading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const data = reactive({
  email: "a@gmail.com",
  name: "Ngocxhoi",
  username: "han",
  password: "123123123",
  passwordConfirm: "123123123",
});

let isLoading = ref(false);

async function handleRegister() {
  const { register } = useAuth();
  isLoading.value = true;
  try {
    await register(data);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

const isButtonDisabled = computed(() => {
  return (
    !data.username || !data.email || !data.password || !data.passwordConfirm
  );
});
</script>
