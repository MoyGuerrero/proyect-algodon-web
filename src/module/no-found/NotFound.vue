<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <h1>La pagina a la cual quieres acceder no exite o esta en mantenimiento</h1>
    <img src="@/assets/images/notFound.jpg" class="h-72" alt="not-found">
    <button @click="handleBack"
      class="py-2 px-2.5 dark:bg-blue-600 bg-blue-600 text-white text-lg font-semibold rounded-lg dark:hover:bg-blue-700 focus:bg-blue-600">
      Regresar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleBack = () => router.replace({ name: 'main' });
</script>

<style scoped></style>
