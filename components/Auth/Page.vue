<template>
  <div class="flex h-screen">
    <div class="relative flex-1 hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="/bg-auth.png"
      />
    </div>
    <div
      class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div
        class="flex flex-col justify-center items-center w-full h-full max-w-sm mx-auto lg:w-96"
      >
        <AuthFormLogin v-if="isLogin" />
        <AuthFormRegister v-else />
        <p class="text-blue-300 mt-2" v-if="isLogin">
          You don't have account?
          <span
            @click="isLogin = !isLogin"
            class="underline cursor-pointer hover:text-blue-400 transition-colors duration-300"
            >Register</span
          >
        </p>
        <p class="text-blue-300 mt-2" v-else>
          Do you have account?
          <span
            @click="isLogin = !isLogin"
            class="underline cursor-pointer hover:text-blue-400 transition-colors duration-300"
            >Log in</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
let isLogin = ref(true);
</script>
