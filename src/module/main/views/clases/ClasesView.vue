<template>
  <div class="border shadow-lg p-4">
    <form class=" grid grid-cols-1 md:grid-cols-2 gap-2">
      <div class="mb-4">
        <label for="id_clasificacion" class="form-label">ID Clasificación</label>
        <custom-input v-bind="idclasificacionAttrs" v-model="idclasificacion" :error="errors.idclasificacion" />
      </div>
      <div class="mb-4">
        <label for="grade" class="form-label">Grade</label>
        <custom-input v-bind="claveAttrs" v-model="clave" :error="errors.clave" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label for="grade" class="form-label">Descripción</label>
        <custom-input v-bind="DescripcionAttrs" v-model="Descripcion" :error="errors.Descripcion" />
        <!-- <text-area-custom v-bind="DescripcionAttrs" v-model="Descripcion" rows="5" :error="errors.Descripcion" /> -->
      </div>
      <div class="md:col-span-2 w-full">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3">
          <button-custom text="Guardar" type="submit" />
          <button-custom text="Nuevo" type="button" />
        </div>
      </div>
    </form>

    <table-custom :thead="thead" />
  </div>
</template>

<script src="./clases.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
