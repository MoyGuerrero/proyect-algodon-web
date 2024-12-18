<template>
  <div class="relative overflow-x-auto mt-4 overflow-y-auto h-96">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
      <thead
        class=" sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
        <tr>
          <th v-for="(title, index) in thead" :key="index" scope="col" class="px-6 py-3">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:border-gray-700" v-for="(body, index) in cuerpo" :key="body.id">
          <td class="px-6 py-4">
            {{ body.id }}
          </td>
          <td class="px-6 py-4" v-if="body.texto1 != null">
            {{ body.texto1 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto2 != null">
            {{ body.texto2 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto3 != null">
            <input
              @input="$emit('modalUpdate', { index, key: body.texto1, value: ($event.target as HTMLInputElement).value ?? 0 });"
              class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              :value="body.texto3" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import type { TBody } from '@/module/main/interfaces';



defineProps<{
  thead: string[],
  cuerpo?: TBody[],
}>();

defineEmits(['modalUpdate'])

</script>

<style scoped></style>
