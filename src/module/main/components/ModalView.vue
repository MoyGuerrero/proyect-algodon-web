<template>
  <div :class="{ 'hidden': !props.open }">
    <div id="default-modal" tabindex="-1"
      class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              {{ props.tipo }}
            </h3>
            <button type="button" @click="$emit('click')"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal">
              <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <input type="text" placeholder="Buscar...."
                @input="$emit('modalUpdate', ($event.target as HTMLInputElement).value ?? 'f')"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
              <TableCustom :thead="cabeceras" :cuerpo="cuerpo" :isViewID="false" :is-optional="false"
                @dblclick="prueba" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="props.open" class="fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"></div>
</template>

<script setup lang="ts">
import TableCustom from '@/components/TableCustom.vue';
import type { TBody } from '../interfaces';


const props = defineProps<{
  open: boolean;
  tipo?: string;
  cabeceras: string[],
  cuerpo?: TBody[]
}>();
const emit = defineEmits(['click', 'modalUpdate', 'setID']);

const prueba = (id: number) => {
  emit('setID', id)
}


</script>

<style scoped></style>
