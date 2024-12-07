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
      <div class="md:col-span-2">
        <div class="flex flex-row-reverse gap-1">
          <button-custom type="button" text="Clases" @click="isVisibleModal = true" />
          <button-custom type="submit" text="Guardar" />

        </div>
      </div>
      <!-- <button type="submit"
        class="dark:bg-green-600 block py-2 rounded-xl md:w-32 w-full text-sm dark:text-white dark:hover:bg-green-800 font-semibold">Guardar</button> -->
    </form>



    <div class="relative overflow-x-auto mt-4">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-100 dark:text-gray-400">
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
          <!-- <tr class="bg-white border-b dark:border-gray-700">
            <td class="px-6 py-4">
              Silver
            </td>
            <td class="px-6 py-4">
              Laptop
            </td>
            <td class="px-6 py-4">
              $2999
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>

  </div>
  <modal-view-with-slots :open="isVisibleModal" @click="isVisibleModal = !isVisibleModal"></modal-view-with-slots>
</template>

<script src="./GradosClasificacion.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
