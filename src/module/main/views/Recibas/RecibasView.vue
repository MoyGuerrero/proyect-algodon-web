<template>
  <div class="border shadow-2xl p-4">
    <form class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div class="mb-4">
        <label class="form-label">Zona</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"></select>
      </div>
      <div class="mb-4">
        <label class="form-label">Gin</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"></select>
      </div>
      <div class="mb-4">
        <label class="form-label">Color</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"></select>
      </div>
      <div class="mb-4">
        <label class="form-label">Basura</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"></select>
      </div>
      <div class="mb-2">
        <label class="form-label">Temporada</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"></select>
      </div>
      <div class="md:col-span-5">
        <label class="form-label">Observaciones</label>
        <TextAreaCustom v-model="observaciones" v-bind="observacionesAttrs" />
      </div>
    </form>
  </div>
</template>

<script src="./Recibas.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
