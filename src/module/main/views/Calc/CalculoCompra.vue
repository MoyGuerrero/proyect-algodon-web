<template>
  <div class="border shadow-2xl p-4">
    <form class="w-full grid grid-cols-2 gap-2">
      <div class="grid grid-cols-1 md:grid-cols-5 content-center gap-2">
        <label class="form-label mt-2">Proveedor</label>
        <input type="text" class="form-control">
        <div class="md:col-span-2">
          <input type="text" class="form-control">
        </div>
        <div class="form-label">aqui el boton</div>

        <div class="md:col-span-2">
          <label class="form-label mt-2">Unidad P/Compra</label>
        </div>
        <div class="md:col-span-2">
          <select class="form-control text-center">
            <option value="" selected>-- Seleccionar --</option>
          </select>
        </div>
        <div class="form-control"></div>

        <label class="form-label mt-2">Precio</label>
        <input type="text" class="form-control" value="0.00">
        <label class="form-label mt-2">Puntos</label>
        <input type="text" class="form-control" value="0.00">
        <div></div>
      </div>
    </form>
  </div>
</template>

<script src="./CalculoCompra.ts" lang="ts">

</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
