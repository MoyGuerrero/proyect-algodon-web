<template>
  <div class="border shadow-lg p-4">
    <form class="grid md:grid-cols-2 grid-cols-1 gap-4">

      <div class="mb-4 md:col-span-2">
        <label class="form-label">Estatus</label>
        <select class="form-control" v-model="estatus" v-bind="estatusAttrs">
          <option value="">Seleccione</option>
          <option value="A">Activo</option>
          <option value="B">Baja</option>
        </select>
        <span class="text-red-400" v-if="errors.estatus">{{ errors.estatus }}</span>
      </div>
      <div class="mb-4">
        <label class="form-label">Fecha Creación</label>
        <custom-input type="date" v-model="fechaCreacion" v-bind="fechaCreacionAttrs" :error="errors.fechaCreacion" />
      </div>
      <div class="mb-4">
        <label class="form-label">Fecha Actualización</label>
        <custom-input type="date" v-model="fechaActualizacion" v-bind="fechaActualizacionAttrs"
          :error="errors.fechaActualizacion" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label class="form-label">Descripción</label>
        <text-area-custom rows="5" v-model="descripcion" v-bind="descripcionAttrs" :error="errors.descripcion" />
      </div>
      <div class="mb-4 md:col-span-2">
        <div class="flex md:flex-row flex-col gap-4">
          <button-custom :type="'submit'" text="Guardar" />
          <button-custom :type="'button'" text="Nuevo" />
        </div>
      </div>
    </form>

    <span class="form-label">Perfiles</span>
    <table-custom :thead="theadPerfiles" />


    <span class="form-label">Detalles</span>
    <table-custom :thead="theadDetalles" />


  </div>
</template>

<script src="./PerfilesVentas.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
