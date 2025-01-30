<template>
  <div class="border shadow-2xl p-4">
    <form class="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
      <div class="flex flex-col">
        <div class="grid grid-cols-1 md:grid-cols-5 content-center gap-2">
          <label class="form-label mt-2">Proveedor</label>
          <input type="text" class="form-control">
          <div class="md:col-span-2">
            <input type="text" class="form-control">
          </div>
          <div class="flex justify-center items-center">
            <button
              class="w-10 h-10 rounded-full flex justify-center items-center text-white bg-green-600 hover:bg-green-800"
              type="button">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <!-- Aqui finaliza la primera parte del grid -->
          <div class="md:col-span-2">
            <label class="form-label mt-2">Unidad P/Compra</label>
          </div>
          <div class="md:col-span-2">
            <select class="form-control text-center">
              <option value="" selected>-- Seleccionar --</option>
            </select>
          </div>
          <div class="form-control">0.00</div>
          <!-- Aqui finaliza la segunda parte del grid -->
          <label class="form-label mt-2">Precio</label>
          <input type="text" class="form-control" value="0.00">
          <label class="form-label mt-2">Puntos</label>
          <input type="text" class="form-control" value="0.00">
          <div></div>
          <!-- Aqui finaliza la tercera parte del grid -->
          <label class="form-label mt-2">Total de pacas</label>
          <div class="form-control">0</div>
          <label class="form-label mt-2">Tara</label>
          <div class="form-control">0</div>
          <input type="checkbox" class="w-4">
          <!-- Finaliza la 4ta del grid -->
          <label class="form-label md:col-span-2 mt-2">Perfil de Compra</label>
          <div class="md:col-span-3">
            <select class="form-control text-center" id="">
              <option value="" selected>-- Seleccionar --</option>
            </select>
          </div>
          <!-- Finaliza 5ta del grid -->
          <label class="form-label mt-2">Observaciones</label>
          <div class="md:col-span-4">
            <textarea class="form-control resize-none"></textarea>
          </div>
          <label class="form-label mt-2">Estatus</label>
          <div class="form-control">Activo</div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-end mt-2">
            <label class="form-label">Subtotal</label>
          </div>
          <div type="text" class="form-control"></div>
        </div>
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li class="me-1" v-for="(tab, index) in tabs" :key="index">
            <button type="button" class="inline-block p-4 text-blue-600 bg-white rounded-t-lg">
              {{ tab }}
            </button>
          </li>
        </ul>
        <div class="grid grid-cols-3 gap-1 mt-2">
          <label class="form-label mt-3">
            <input type="checkbox" class="w-4"> Mic
          </label>
          <select class="form-control">
            <option value="">-- Seleccionar --</option>
          </select>
          <input type="number" readonly value="0.00" class="form-control">

          <!-- Segunda parte de la tabla -->
          <label class="form-label mt-3">
            <input type="checkbox" class="w-4"> Strength
          </label>
          <select class="form-control">
            <option value="">-- Seleccionar --</option>
          </select>
          <input type="number" readonly value="0.00" class="form-control">

          <!-- Tercera parte de la tabla -->
          <label class="form-label mt-3">
            <input type="checkbox" class="w-4"> UHML
          </label>
          <select class="form-control">
            <option value="">-- Seleccionar --</option>
          </select>
          <input type="number" readonly value="0.00" class="form-control">

          <!-- Cuarta parte de la tabla -->
          <label class="form-label mt-3">
            <input type="checkbox" class="w-4"> Uniformity
          </label>
          <select class="form-control">
            <option value="">-- Seleccionar --</option>
          </select>
          <input type="number" readonly value="0.00" class="form-control">
        </div>
        <div class="grid grid-cols-2 gap-1 mt-2">
          <div class="text-end mt-2">
            <label class="form-label">Deducción total</label>
          </div>
          <input type="number" value="0.00" class="form-control">
          <div class="text-end mt-2">
            <label class="form-label">Total</label>
          </div>
          <input type="number" value="0.00" class="form-control">
        </div>

        <!-- Aqui iria la segunda parte del otro div -->
        <span class="form-label">Precios por clase</span>
        <hr>
        <table-with-slot :thead="cabecera"></table-with-slot>
      </div>
    </form>

    <!-- <div class="grid grid-cols-12 gap-1">
      <div class="col-span-11"> -->
    <table-with-slot :thead="thead"></table-with-slot>
    <!-- </div>
      <div class="flex flex-col items-center mt-6">
        <button class="bg-blue-800 w-10 h-10 rounded-full text-sm text-white">+</button>
        <button class="bg-blue-800 w-10 h-10 rounded-full text-sm text-white">+</button>
      </div>
    </div> -->
  </div>
</template>

<script src="./CalculoCompra.ts" lang="ts">

</script>

<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.form-label {
  @apply block text-gray-700 text-[12px] font-bold mb-2;
}
</style>
