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
        <tr class="bg-white border-b dark:border-gray-700" v-for="body in cuerpo" :key="body.id">
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
            {{ body.texto3 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto4 != null">
            {{ body.texto4 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto5 != null">
            {{ body.texto5 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto6 != null">
            {{ body.texto6 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto7 != null">
            {{ body.texto7 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto8 != null">
            {{ body.texto8 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto9 != null">
            {{ body.texto9 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto10 != null">
            {{ body.texto10 }}
          </td>
          <td class="px-6 py-4" v-if="isOptional">
            <span class="underline decoration-1 cursor-pointer" @click="$emit('click', body)">Seleccionar</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import type { TBody } from '@/module/main/interfaces/TableCustom.interface';


defineProps<{
  thead: string[],
  cuerpo?: TBody[],
  isOptional: boolean
}>();

defineEmits(['click'])

</script>

<style scoped></style>
