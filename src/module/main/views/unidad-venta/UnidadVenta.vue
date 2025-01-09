<template>
  <div class="border shadow-2xl p-4">
    <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="hidden">
        <label class="form-label">ID</label>
        <custom-input v-model="idperfilenc" v-bind="idperfilencAttrs" :error="errors.idperfilenc" />
      </div>

      <div>
        <label class="form-label">Valor</label>
        <custom-input v-model="valorunidad" type="text" v-bind="valorunidadAttrs" :error="errors.valorunidad" />
      </div>

      <div>
        <label class="form-label">Estatus</label>
        <!-- <custom-input v-model="idperfilenc" type="number" v-bind="idperfilencAttrs" :error="errors.idperfilenc" /> -->
        <select
          class="shadow appearance-none border focus:ring rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          v-model="idestatus" v-bind="idestatusAttrs">
          <option value="">Seleccionar</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>
        <span v-if="errors.idestatus" class="text-red-400">{{ errors.idestatus }}</span>
      </div>

      <div>
        <label class="form-label">Fecha creación</label>
        <custom-input v-model="fechacreacion" type="datetime-local" readonly v-bind="fechacreacionAttrs"
          :error="errors.fechacreacion" />
      </div>


      <div>
        <label class="form-label">Fecha actualización</label>
        <custom-input v-model="fechaactualizacion" type="datetime-local" readonly v-bind="fechaactualizacionAttrs"
          :error="errors.fechaactualizacion" />
      </div>

      <div class="md:col-span-4">
        <label class="form-label">Descripción</label>
        <custom-input v-model="descripcion" type="text" v-bind="descripcionAttrs" :error="errors.descripcion" />
        <!-- <text-area-custom v-model="descripcion" type="text" v-bind="descripcionAttrs" :error="errors.descripcion" /> -->
      </div>

      <div class="md:col-span-4">
        <div class="flex flex-row-reverse gap-4">
          <button-custom type="submit" text="Guardar" />
          <button-custom type="button" bg-color="bg-blue-600" hover="hover:bg-blue-800" @click="reset" text="Nuevo" />
        </div>
      </div>
    </form>

    <table-custom :thead="cabecera" :cuerpo="body" :is-optional="false" @dblclick="unidadSeleccionada" />
  </div>
  <LoadingCustom :open="isLoading" :texto="textLoading" />
</template>

<script src="./UnidadVenta.ts" lang="ts">

</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
