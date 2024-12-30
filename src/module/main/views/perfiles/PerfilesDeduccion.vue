<template>
  <div class="border shadow-lg p-4">
    <label class="form-label">Datos Generales</label>
    <hr>
    <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div class="hidden">
        <custom-input v-model="idperfilenc" v-bind="idperfilencAttrs" />
      </div>
      <div>
        <label class="form-label">Estatus</label>
        <select v-model="idestatus" v-bind="idestatusAttrs"
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
        <custom-input type="text" v-model="descripcion" v-bind="descripcionAttrs" :error="errors.descripcion" />
      </div>

      <div class="md:col-span-3">
        <div class="flex justify-between items-center gap-1">
          <div class="flex gap-4">
            <button-custom type="submit" text="Guardar" />
            <button-custom type="button" @click="resetForm" text="Nuevo" />

          </div>
          <div class="flex flex-row-reverse">
            <button class="bg-green-600 px-3 py-2.5 rounded-full text-white hover:bg-green-700" type="button">
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
    <table-custom :thead="cabecera" :cuerpo="perfilesEnc" @dblclick="selectedRow" />

    <hr>
    <label class="form-label">Detalles</label>
    <div class="flex justify-between items-center">
      <button class="bg-green-600 px-3 py-2.5 rounded-full text-white mb-1 hover:bg-green-700" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </button>
      <div class="flex flex-col justify-center items-center gap-0">
        <button class="bg-green-600 w-10 h-10 rounded-full text-white font-bold hover:bg-green-700"
          @click="addRow">+</button>
        <label class="form-label">Agregar Filas</label>
      </div>
    </div>
    <hr>
    <table-with-slot :thead="cabeceradet">
      <template #body>
        <tr class="bg-white border-b dark:border-gray-700 cursor-pointer text-center" v-for="(p, index) in perfilesDet"
          :key=p.id>
          <td class="px-6 py-4 text-center">
            <input class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              @input="valores($event, 'rango1', index)" :value="p.rango1">
          </td>
          <td class="px-6 py-4">
            <input class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              @input="valores($event, 'rango2', index)" :value="p.rango2">
          </td>
          <td class="px-6 py-4">
            <input class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              @input="valores($event, 'castigo', index)" :value="p.castigo">
          </td>
          <td class="px-6 py-4" v-if="p.lenghtNDS !== undefined">
            <input class="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              @input="valores($event, 'lenghtNDS', index)" :value="p.lenghtNDS">
          </td>
          <td class="px-6 py-4"> <button class="bg-red-600 w-10 h-10 rounded-full text-white font-bold hover:bg-red-700"
              @click="removeRow(p.id)">-</button>
          </td>
        </tr>
      </template>
    </table-with-slot>
  </div>

  <modal-confirmation :open="open">
    <template #header>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white capitalize">
        ¿Estas seguro que deseas eliminar este perfil?
      </h3>
      <button type="button" @click="open = false"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="default-modal">
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </template>
    <template #body>
      <div class="flex justify-center gap-4">
        <button @click="open = false"
          class="bg-blue-600 md:py-2 py-4 px-3 rounded-lg text-white md:w-32 text-sm hover:bg-blue-800 w-full font-semibold">Cancelar</button>
        <button @click="deletePerfil"
          class="bg-red-600 md:py-2 py-4 px-3 rounded-lg text-white md:w-32 text-sm hover:bg-red-800 w-full font-semibold">Aceptar</button>
      </div>
    </template>
  </modal-confirmation>

  <LoadingCustom :open="isLoading" :texto="texto" />
</template>

<script src="./PerfilesDeduccion.ts" lang="ts">

</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
