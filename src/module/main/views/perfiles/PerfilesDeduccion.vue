<template>
  <div class="border shadow-lg p-4">
    <label class="form-label">Datos Generales</label>
    <hr>
    <form class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

      <div class="md:col-span-3">
        <label class="form-label">Descripción</label>
        <custom-input type="text" readonly v-model="descripcion" v-bind="descripcionAttrs"
          :error="errors.descripcion" />
      </div>

      <div class="md:col-span-3">
        <div class="flex justify-between items-center gap-1">
          <div class="flex gap-4">
            <button-custom type="submit" text="Guardar" />
            <button-custom type="button" text="Nuevo" />

          </div>
          <div class="flex flex-row-reverse">
            <button class="bg-green-600 px-3 py-2.5 rounded-full text-white" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>

            </button>
          </div>
        </div>
      </div>
    </form>
    <hr>
    <label class="form-label mt-1">Perfiles</label>
    <table-custom :thead="cabecera" :cuerpo="perfilesEnc" />

    <hr>
    <label class="form-label">Detalles</label>
    <button class="bg-green-600 px-3 py-2.5 rounded-full text-white mb-1" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    </button>
    <hr>
    <table-with-slot :thead="cabeceradet">
      <template #body>
        <tr class="bg-white border-b dark:border-gray-700 cursor-pointer text-center" v-for="p in prueba" :key=p.id>
          <td class="px-6 py-4">{{ p.rango1 }}</td>
          <td class="px-6 py-4">{{ p.rango2 }}</td>
          <td class="px-6 py-4">{{ p.castigo }}</td>
        </tr>
      </template>
    </table-with-slot>
  </div>

  <LoadingCustom :open="isLoading" :texto="texto" />
</template>

<script src="./PerfilesDeduccion.ts" lang="ts">

</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
