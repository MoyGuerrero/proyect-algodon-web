<template>
  <div class="border shadow-2xl p-4">
    <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4 hidden">
        <CustomInput v-model="Idgradosclasificacion" v-bind="IdgradosclasificacionAttrs" />
      </div>
      <div class="mb-4">
        <label for="grado" class="form-label">Grado</label>
        <CustomInput v-model="gradocolor" v-bind="gradocolorAttrs" :error="errors.gradocolor" />
      </div>
      <div class="mb-4">
        <label for="trashId" class="form-label">Trash ID</label>
        <CustomInput v-model="trashId" v-bind="trashIdAttrs" :error="errors.trashId" />
      </div>
      <div class="mb-4">
        <label for="color" class="form-label">Color</label>
        <CustomInput v-model="descripcion" v-bind="descripcionAttrs" :error="errors.descripcion" />
      </div>
      <div class="mb-4">
        <label for="grade" class="form-label">Grade</label>
        <!-- <CustomInput v-model="grade" v-bind="gradeAttrs" :error="errors.grade" /> -->
        <select v-model="idclase" v-bind="idclaseAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
          <option value="">-- Seleccionar --</option>
          <option v-for="g in grades" :key="g.id" :value="g.id">{{ g.clave }}</option>
        </select>
        <span class="text-red-400" v-if="errors.idclase">{{ errors.idclase }}</span>
      </div>
      <div class="md:col-span-2 gap-1">
        <div class="flex flex-col md:flex-row justify-between items-center gap-1">
          <div class="gap-1 flex flex-col md:flex-row w-full">
            <button-custom type="button" text="Clases" @click="isVisibleModal = true" />
            <button-custom type="submit" text="Guardar" />
          </div>
          <div class="flex flex-row-reverse">
            <button class="bg-green-600 px-3 py-2.5 rounded-full text-white" type="button" @click="dowload">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
          <tr class="bg-white border-b dark:border-gray-700 cursor-pointer" @dblclick="edit(dato.idgradosclasificacion)"
            v-for="dato in datos" :key="dato.idgradosclasificacion">
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
  <LoadingCustom :open="isLoading" :texto="textLoading" />
  <modal-view-with-slots :open="isVisibleModal" @click="isVisibleModal = !isVisibleModal"></modal-view-with-slots>
</template>

<script src="./GradosClasificacion.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
