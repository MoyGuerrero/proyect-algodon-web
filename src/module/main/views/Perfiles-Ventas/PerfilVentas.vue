<template>
  <div class="border shadow-lg p-4">
    <form @submit="onSubmit" class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <div class="hidden">
        <custom-input type="number" v-model="idperfilenc" v-bind="idperfilencAttrs" :error="errors.idperfilenc" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label class="form-label">Estatus</label>
        <select class="form-control" v-model="idestatus" v-bind="idestatusAttrs">
          <option value="">Seleccione</option>
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>
        <span class="text-red-400" v-if="errors.idestatus">{{ errors.idestatus }}</span>
      </div>
      <div class="mb-4">
        <label class="form-label">Fecha Creación</label>
        <custom-input type="datetime-local" v-model="fechacreacion" v-bind="fechacreacionAttrs"
          :error="errors.fechacreacion" readonly />
      </div>
      <div class="mb-4">
        <label class="form-label">Fecha Actualización</label>
        <custom-input type="datetime-local" v-model="fechaactualizacion" v-bind="fechaactualizacionAttrs"
          :error="errors.fechaactualizacion" readonly />
      </div>
      <div class="mb-4 md:col-span-2">
        <label class="form-label">Descripción</label>
        <!-- <text-area-custom rows="5" v-model="descripcion" v-bind="descripcionAttrs" :error="errors.descripcion" /> -->
        <custom-input v-model="descripcion" v-bind="descripcionAttrs" :error="errors.descripcion" />
      </div>
      <div class="mb-4 md:col-span-2">
        <div class="flex md:flex-row-reverse flex-col gap-4">
          <button-custom :type="'submit'" text="Guardar" />
          <button-custom :type="'button'" text="Nuevo" />
        </div>
      </div>
    </form>

    <span class="form-label">Perfiles</span>
    <table-custom :thead="theadPerfiles" :cuerpo="perfiles" :is-optional="actionOption" @dblclick="getID" />


    <span class="form-label">Detalles</span>
    <table-custom-with-input :thead="theadDetalles" :cuerpo="Detalles" @modal-update="updateModal" />


  </div>
  <LoadingCustom :open="isLoading" :texto="textLoading" />
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
