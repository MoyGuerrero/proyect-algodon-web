<template>
  <div class="relative overflow-x-auto mt-4 overflow-y-auto h-96">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
      <thead
        class=" sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
        <tr>
          <th v-for="(title, index) in thead" :key="index" scope="col" class="px-6 py-3 text-center">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
        <!-- <tr class="bg-white border-b dark:border-gray-700 cursor-pointer text-center"
          @dblclick="$emit('dblclick', body.id);" v-for="body in cuerpo" :key="body.id">
          <td class="px-6 py-4" v-if="isViewID">
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
          <td class="px-6 py-4" v-if="body.texto11 != null">
            {{ body.texto11 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto12 != null">
            {{ body.texto12 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto13 != null">
            {{ body.texto13 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto14 != null">
            {{ body.texto14 }}
          </td>
          <td class="px-6 py-4" v-if="body.texto15 != null">
            {{ body.texto15 }}
          </td>
          <td class="px-6 py-4" v-if="isOptional">
            <span class="underline decoration-1 cursor-pointer" @click="$emit('click', body.id)">Seleccionar</span>
          </td>
          <td class="px-6 py-4" v-if="isAction">
            <button class="hover:text-blue-700" @click="openModal(body)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </td>
        </tr> -->
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
