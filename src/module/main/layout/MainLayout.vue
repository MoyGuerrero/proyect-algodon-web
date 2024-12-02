<template>
  <side-bar></side-bar>
  <div class="p-4 sm:ml-64">
    <!-- <div class="bg-[url('@/assets/images/ICONO_CALCULA_COTTON-30.png')] h-screen">
    </div> -->
    <div class="p-4 container mx-auto">
      <RouterView />
    </div>
  </div>




</template>

<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
</script>

<style scoped></style>
