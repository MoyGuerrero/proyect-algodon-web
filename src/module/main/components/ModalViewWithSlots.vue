<template>
  <div :class="{ 'hidden': !openModal }">
    <div id="default-modal" tabindex="-1" aria-hidden="true"
      class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              Clases
            </h3>
            <button type="button" @click="$emit('click')"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">

            <form class=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="mb-4">
                <label for="id_clasificacion" class="form-label text-white">ID Clasificación</label>
                <custom-input v-bind="id_ClasificacionAttrs" v-model="id_Clasificacion"
                  :error="errors.id_Clasificacion" />
              </div>
              <div class="mb-4">
                <label for="grade" class="form-label text-white">Grade</label>
                <custom-input v-bind="gradeAttrs" v-model="grade" :error="errors.grade" />
              </div>
              <div class="mb-4 md:col-span-2">
                <label for="grade" class="form-label text-white">Descripción</label>
                <text-area-custom v-bind="descripcionAttrs" v-model="descripcion" rows="5"
                  :error="errors.descripcion" />
              </div>
              <div class="md:col-span-2 w-full">
                <div class="flex flex-col  md:flex-row-reverse justify-between items-center gap-3">
                  <button-custom text="Guardar" type="submit" />
                  <!-- <button-custom text="Nuevo" type="button" /> -->
                </div>
              </div>
            </form>

            <table-custom :thead="thead" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="openModal" class="fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"></div>
</template>

<script src="../views/clases/clases.ts" lang="ts">


</script>

<style scoped></style>
