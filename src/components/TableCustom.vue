<template>
  <div class="relative overflow-x-auto mt-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
        <tr>
          <th v-for="(title, index) in thead" :key="index" scope="col" class="px-6 py-3">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:border-gray-700" v-for="(name, index) in body" :key="index">
          <td class="px-6 py-4">
            {{ name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">

defineProps<{
  thead: string[],
  body?: string[]
}>();

</script>

<style scoped></style>
