<template>
  <div class="border shadow-2xl p-4">
    <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label for="grado" class="form-label">Grado</label>
        <CustomInput v-model="grados" v-bind="gradosAttrs" :error="errors.grados" />
      </div>
      <div class="mb-4">
        <label for="trashId" class="form-label">Trash ID</label>
        <CustomInput v-model="trashId" v-bind="trashIdAttrs" :error="errors.trashId" />
      </div>
      <div class="mb-4">
        <label for="color" class="form-label">Color</label>
        <CustomInput v-model="color" v-bind="colorAttrs" :error="errors.color" />
      </div>
      <div class="mb-4">
        <label for="grade" class="form-label">Grade</label>
        <CustomInput v-model="grade" v-bind="gradeAttrs" :error="errors.grade" />
      </div>
      <div class="md:col-span-2 gap-1">
        <div class="flex flex-col md:flex-row justify-between items-center gap-1">
          <div class="gap-1 flex flex-col md:flex-row w-full">
            <button-custom type="button" text="Clases" @click="isVisibleModal = true" />
            <button-custom type="submit" text="Guardar" />
          </div>
          <div class="flex flex-row-reverse">
            <button class="bg-green-600 px-3 py-2.5 rounded-full text-white" type="button" @click="dowload">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- <button type="submit"
        class="dark:bg-green-600 block py-2 rounded-xl md:w-32 w-full text-sm dark:text-white dark:hover:bg-green-800 font-semibold">Guardar</button> -->
    </form>



    <div class="relative overflow-x-auto mt-4 overflow-y-auto h-96">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="sticky top-0 left-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Color Grade
            </th>
            <th scope="col" class="px-6 py-3">
              Trash ID
            </th>
            <th scope="col" class="px-6 py-3">
              Descripción
            </th>
            <th scope="col" class="px-6 py-3">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:border-gray-700" v-for="dato in datos" :key="dato.idgradosclasificacion">
            <td class="px-6 py-4">
              {{ dato.gradocolor }}
            </td>
            <td class="px-6 py-4">
              {{ dato.trashid }}
            </td>
            <td class="px-6 py-4">
              {{ dato.descripcion }}
            </td>
            <td class="px-6 py-4">
              {{ dato.clave }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
  <LoadingCustom :open="isLoading" texto="Cargando" />
  <modal-view-with-slots :open="isVisibleModal" @click="isVisibleModal = !isVisibleModal"></modal-view-with-slots>
</template>

<script src="./GradosClasificacion.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
