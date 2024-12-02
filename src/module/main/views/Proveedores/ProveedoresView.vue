<template>
  <div class="border shadow-2xl p-4">
    <form @submit="onSubmit" class="grid grid-cols-4 gap-4">
      <div class="mb-4 col-span-2">
        <label for="razonSocial" class="form-label">Razón Social</label>
        <CustomInput v-model="razonSocial" v-bind="razonSocialAttrs" :error="errors.razonSocial" />
      </div>
      <div class="mb-4 col-span-2">
        <label for="rfc" class="form-label">R.F.C</label>
        <CustomInput v-model="rfc" v-bind="rfcAttrs" :error="errors.rfc" />
      </div>

      <div class="mb-4 col-span-2">
        <label for="calle" class="form-label">Calle</label>
        <CustomInput v-model="calle" v-bind="calleAttrs" :error="errors.calle" />
      </div>
      <div class="mb-4">
        <label for="numExt" class="form-label">Núm. Ext.</label>
        <CustomInput v-model="numExt" v-bind="numExtAttrs" :error="errors.numExt" />
      </div>
      <div class="mb-4">
        <label for="cp" class="form-label">C.P.</label>
        <CustomInput v-model="cp" v-bind="cpAttrs" :error="errors.cp" />
      </div>

      <div class="mb-4 col-span-2">
        <label for="colonia" class="form-label">Colonia</label>
        <CustomInput v-model="colonia" v-bind="coloniaAttrs" :error="errors.colonia" />
      </div>
      <div class="mb-4 col-span-2">
        <label for="municipio" class="form-label">Municipio</label>
        <CustomInput v-model="municipio" v-bind="municipioAttrs" :error="errors.municipio" />
      </div>

      <div class="mb-4 col-span-2">
        <label for="estado" class="form-label">Estado</label>
        <CustomInput v-model="estado" v-bind="estadoAttrs" :error="errors.estado" />
      </div>

      <div class="mb-4 col-span-2">
        <label for="pais" class="form-label">Pais</label>
        <CustomInput v-model="pais" v-bind="paisAttrs" :error="errors.pais" />
      </div>

      <div class="mb-4 col-span-2">
        <label for="nombre" class="form-label">Nombre</label>
        <CustomInput v-model="nombre" v-bind="nombreAttrs" :error="errors.nombre" />
      </div>
      <div class="mb-4">
        <label for="email" class="form-label">Correo Electronico</label>
        <CustomInput v-model="email" type="email" v-bind="emailAttrs" :error="errors.email" />
      </div>
      <div class="mb-4">
        <label for="telefono" class="form-label">Telefono</label>
        <CustomInput v-model="telefono" v-bind="telefonoAttrs" :error="errors.telefono" />
      </div>

      <!-- <button class="dark:bg-blue-600 py-2 rounded-xl dark:text-white dark:hover:bg-blue-800 font-semibold">Nuevo</button> -->
      <button type="submit"
        class="dark:bg-green-600 py-2 rounded-xl dark:text-white dark:hover:bg-green-800 font-semibold">Guardar</button>
      <!-- <button>Guardar</button> -->
    </form>

  </div>
  <!-- <pre>{{ errors }}</pre> -->
</template>

<script src="./Proveedores.ts" lang="ts"></script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
