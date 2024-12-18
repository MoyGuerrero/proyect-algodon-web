<template>
  <div class="border shadow-lg p-4">
    <label class="form-label">Datos Generales</label>
    <hr>
    <form class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="hidden">
        <custom-input v-model="id" v-bind="idAttrs" />
      </div>
      <div>
        <label class="form-label">Estatus</label>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none">
          <option value="">Seleccione</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>
      </div>

      <div>
        <label class="form-label">Fecha creación</label>
        <custom-input type="datetime-local" readonly v-model="fechacreacion" v-bind="fechacreacionAttrs"
          :error="errors.fechacreacion" />
      </div>

      <div>
        <label class="form-label">Fecha Actuación</label>
        <custom-input type="datetime-local" readonly v-model="fechaactualizacion" v-bind="fechaactualizacionAttrs"
          :error="errors.fechaactualizacion" />
      </div>
    </form>
  </div>
</template>

<script src="./PerfilesDeduccion.ts" lang="ts">

</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
