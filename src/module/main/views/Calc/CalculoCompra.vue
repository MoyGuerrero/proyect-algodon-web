<template>
  <div class="border shadow-2xl p-4">
    <form>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col justify-center items-center">
          <div class="flex gap-2 items-center mb-4">
            <label class="form-label">Proveedor</label>
            <input type="text" class="form-control">
            <input type="text" class="form-control">

          </div>
          <div class="flex gap-2 items-center">
            <label class="form-label">Proveedor</label>
            <input type="text" class="form-control">
            <input type="text" class="form-control">
          </div>
        </div>

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
