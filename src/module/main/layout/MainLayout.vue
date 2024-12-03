<template>
  <side-bar></side-bar>
  <div class="p-4 sm:ml-64">
    <BreadCrumbs :path="fullPath" />
    <!-- <div class="bg-[url('@/assets/images/ICONO_CALCULA_COTTON-30.png')] h-screen">
    </div> -->
    <div class="p-4 container mx-auto">
      <RouterView />
    </div>
  </div>




</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SideBar from '../components/SideBar.vue';
import { onMounted, ref, watch } from 'vue';
import BreadCrumbs from '../components/BreadCrumbs.vue';

const route = useRoute();

const fullPath = ref<string>("");

watch(() => route.fullPath, (newFullPath) => {
  if (newFullPath.split('/').length > 2) {
    fullPath.value = getPathBreadCrumbs(newFullPath);
  } else {
    fullPath.value = ""
  }
});

onMounted(() => {
  fullPath.value = route.fullPath.split('/').length > 2 ? getPathBreadCrumbs(route.fullPath) : "";
});


const getPathBreadCrumbs = (path: string): string => {
  return path.split('/')[path.split('/').length - 1].replace('-', " ");
}

</script>

<style scoped></style>
