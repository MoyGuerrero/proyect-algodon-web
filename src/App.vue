<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './module/auth/stores/auth.stores';
import { AuthStatus } from './module/auth/interfaces';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe((_, state) => {

  if (state.authStatus === AuthStatus.Checking) {
    authStore.checkStatusAuth();
    return;
  }
  if (route.name === 'login' && state.authStatus === AuthStatus.Autenticado) {
    router.replace({ name: 'main' });
    return;
  }

}, {
  immediate: true
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
