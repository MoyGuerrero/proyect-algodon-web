<template>
  <div class="border shadow-2xl p-4">
    <form @submit="onSubmit" class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="mb-4 md:col-span-2 hidden">
        <label for="id" class="form-label">ID</label>
        <CustomInput v-model="idcliente" v-bind="idclienteAttrs" :error="errors.idcliente" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label for="razonSocial" class="form-label">Razón Social</label>
        <CustomInput v-model="nombre" v-bind="nombreAttrs" :error="errors.nombre" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label for="rfc" class="form-label">R.F.C</label>
        <CustomInput v-model="rfc" v-bind="rfcAttrs" :error="errors.rfc" />
      </div>
      <hr class="block md:hidden">
      <div class="mb-4 md:col-span-2">
        <label for="calle" class="form-label">Calle</label>
        <CustomInput v-model="calle" v-bind="calleAttrs" :error="errors.calle" />
      </div>
      <div class="mb-4">
        <label for="numExt" class="form-label">Núm. Ext.</label>
        <CustomInput v-model="numext" v-bind="numextAttrs" :error="errors.numext" />
      </div>
      <div class="mb-4">
        <label for="cp" class="form-label">C.P.</label>
        <CustomInput v-model="codigopostal" v-bind="codigopostalAttrs" :error="errors.codigopostal" />
      </div>

      <div class="mb-4 md:col-span-2">
        <label for="colonia" class="form-label">Colonia</label>
        <CustomInput v-model="colonia" v-bind="coloniaAttrs" :error="errors.colonia" />
      </div>
      <div class="mb-4 md:col-span-2">
        <label for="municipio" class="form-label">Municipio</label>
        <CustomInput v-model="municipio" v-bind="municipioAttrs" :error="errors.municipio" />
      </div>

      <div class="mb-4 md:col-span-2">
        <label for="estado" class="form-label">Estado</label>
        <CustomInput v-model="estado" v-bind="estadoAttrs" :error="errors.estado" />
      </div>

      <div class="mb-4 md:col-span-2">
        <label for="pais" class="form-label">Pais</label>
        <CustomInput v-model="pais" v-bind="paisAttrs" :error="errors.pais" />
      </div>
      <hr class="block md:hidden">
      <div class="mb-4 md:col-span-2">
        <label for="nombre" class="form-label">Nombre</label>
        <CustomInput v-model="nombrecontacto" v-bind="nombrecontactoAttrs" :error="errors.nombrecontacto" />
      </div>
      <div class="mb-4">
        <label for="email" class="form-label">Correo Electronico</label>
        <CustomInput v-model="mail" type="mail" v-bind="mailAttrs" :error="errors.mail" />
      </div>
      <div class="mb-4">
        <label for="telefono" class="form-label">Telefono</label>
        <CustomInput v-model="telefono" type="tel" v-bind="telefonoAttrs" :error="errors.telefono" />
      </div>
      <div class="md:col-span-4">
        <div class="flex flex-row-reverse gap-1">
          <button-custom type="submit" text="Guardar" />
          <button-custom type="button" bg-color="bg-blue-600" hover="hover:bg-blue-800" @click="reset" text="Nuevo" />
          <button-custom type="button" bg-color="bg-blue-600" hover="hover:bg-blue-800" text="Consultar"
            @click="consultar" />

        </div>
      </div>
      <!-- <button class="dark:bg-blue-600 py-2 rounded-xl dark:text-white dark:hover:bg-blue-800 font-semibold">Nuevo</button> -->
      <!-- <button type="submit"
        class="dark:bg-green-600 md:py-2 py-4 px-3 rounded-xl dark:text-white dark:hover:bg-green-800 w-full font-semibold">
        Guardar
      </button>
      <button type="button" @click="isOpenModal = true"
        class="dark:bg-blue-600 md:py-2 py-4 px-3 rounded-xl dark:text-white dark:hover:bg-blue-800 w-full font-semibold">Consultar
      </button> -->
    </form>
    <ModalView :open="isOpenModal" @click="isOpenModal = false" :tipo="name" :cabeceras="cabecera"
      :cuerpo="ClientAndProveedor" @modalUpdate="onDebounce" @setID="seleccionar" />
    <LoadingCustom :open="isLoading" texto="Guardando......" />
  </div>
  <!-- <pre>{{ errors }}</pre> -->
</template>

<script src="./Proveedores.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
