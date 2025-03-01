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
        <tr class="bg-white border-b dark:border-gray-700 cursor-pointer text-center"
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
        </tr>
      </tbody>
    </table>
  </div>

  <ModalConfirmation :open="open">
    <template #header>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize">
        ¿Estas seguro que deseas actualizar este perfil?
      </h3>
      <button type="button" @click="open = false"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="default-modal">
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </template>
    <template #body>
      <div class="flex flex-col justify-center items-center gap-4">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Nombre del perfil </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{{ descripcion }} </p>
        <div class="flex justify-between items-center gap-4">
          <button @click="open = false"
            class="bg-red-600 md:py-2 py-4 px-3 rounded-lg text-white md:w-32 text-sm hover:bg-red-800 w-full font-semibold">Cancelar</button>
          <ButtonCustom type="button" text="Aceptar" @click="actualizar" />
        </div>
      </div>
    </template>
  </ModalConfirmation>

</template>

<script setup lang="ts">
import ModalConfirmation from '@/module/main/components/ModalConfirmation.vue';
import type { TBody } from '@/module/main/interfaces/TableCustom.interface';
import ButtonCustom from '@/components/ButtonCustom.vue';
import { ref, watch } from 'vue';
const open = ref<boolean>(false);
const descripcion = ref<string | number | null>('');
const id = ref<string | number>('');

const props = withDefaults(defineProps<{
  thead: string[],
  cuerpo?: TBody[],
  isOptional?: boolean,
  isViewID?: boolean,
  isAction?: boolean,
  closedModal?: boolean
}>(), {
  isViewID: true,
  isAction: false
});

const emit = defineEmits(['click', 'dblclick', 'updateStatus']);

const actualizar = () => {
  emit('updateStatus', id.value);
  open.value = false;
}

// $emit('updateStatus', id)
const openModal = (data: TBody) => {
  open.value = true;
  if (data.texto1) {
    id.value = data.id;
    descripcion.value = data.texto1;
  }
}

watch(() => props.closedModal, (newValue) => {
  open.value = newValue;
})

</script>

<style scoped></style>
