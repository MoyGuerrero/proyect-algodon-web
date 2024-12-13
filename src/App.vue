<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './module/auth/stores/auth.stores';
import { AuthStatus } from './module/auth/interfaces';
import LoadingView from './module/common/components/LoadingView.vue';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
let redirectInProgress = false;
authStore.$subscribe((_, state) => {

  if (state.authStatus === AuthStatus.Checking) {
    authStore.checkStatusAuth();
    return;
  }

  if (state.authStatus === AuthStatus.NoAutenticado) {
    redirectInProgress = false;
    return;
  }

  if (redirectInProgress) return

  if ((route.name === 'login' || route.name === undefined) && state.authStatus === AuthStatus.Autenticado) {
    redirectInProgress = true;
    router.replace({ name: localStorage.getItem('path') ?? 'main' });
    return;
  }

}, {
  immediate: true
});
</script>

<template>
  <LoadingView v-if="authStore.isChecking" />
  <RouterView v-else />

</template>

<style scoped></style>
