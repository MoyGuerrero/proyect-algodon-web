<template>
  <div class="relative overflow-x-auto mt-2 overflow-y-auto h-96">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
      <thead class="sticky top-0 left-0 text-[8.5px]  text-gray-700 capitalize bg-gray-50 ">
        <tr>
          <th v-for="(title, index) in thead" :key="index" scope="col" class="px-6 py-3">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  thead: string[],
}>()
</script>

<style scoped></style>
