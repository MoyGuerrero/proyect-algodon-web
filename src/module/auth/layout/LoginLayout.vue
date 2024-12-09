<template>
  <div class="bg-sky-100 dark:bg-blue-900 flex justify-center items-center h-screen">
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="../../../assets/images/CottonPlant.jpg" alt="Cotto_Plan.jpg" class="object-cover w-full h-full">
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-5xl font-semibold mb-4 text-white">Bienvenido</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="txtUsuario" class="block text-white">Usuario</label>
          <div class="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6 absolute ml-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <input type="text" v-model="myForm.usuario" ref="usuarioInputRef"
              class="w-full border border-gray-300 py-1.5 rounded-lg pl-8 text-sm" id="txtUsuario">
          </div>
        </div>
        <div class="mb-4">
          <label for="txtPassword" class="block text-white">Contraseña</label>
          <div class="relative flex items-center">
            <PadLockOpen @click="padlockOpen = !padlockOpen" v-if="padlockOpen" />
            <PadLockClosed @click="padlockOpen = !padlockOpen" v-if="!padlockOpen" />
            <input :type="padlockOpen ? 'text' : 'password'"
              class="w-full border border-gray-300 py-1.5 rounded-lg pl-8 text-sm" ref="claveInputRef"
              v-model="myForm.clave" id="txtPassword">
          </div>
        </div>
        <div class="flex items-center gap-2 mb-4">
          <input type="checkbox" id="chkRecordarUsuario" v-model="myForm.recuerdame">
          <label for="chkRecordarUsuario" class="block text-white">Recordar usuario</label>
        </div>

        <button
          class="w-full dark:bg-green-600 text-center py-2.5 px-3 rounded-lg dark:text-white text-lg dark:hover:bg-green-800 cursor-pointer">
          Iniciar sesión
          <!-- <>Iniciar sesión</> -->
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import PadLockClosed from '../icons/PadLockClosed.vue';
import PadLockOpen from '../icons/PadLockOpen.vue';

import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.stores';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore()

const padlockOpen = ref<boolean>(false)

const myForm = reactive({
  usuario: '',
  clave: '',
  recuerdame: false
});

const claveInputRef = ref<HTMLInputElement | null>(null);
const usuarioInputRef = ref<HTMLInputElement | null>(null);
const toast = useToast();
const login = async () => {

  if (!myForm.usuario.trim().length) {
    usuarioInputRef.value?.classList.add("border-red-400")
    usuarioInputRef.value?.classList.add("border-2")
    return;
  } else {
    usuarioInputRef.value?.classList.remove("border-red-400")
    usuarioInputRef.value?.classList.remove("border-2")
  }

  if (!myForm.clave.trim().length) {
    claveInputRef.value?.classList.add("border-red-400")
    claveInputRef.value?.classList.add("border-2")
    return;
  } else {
    claveInputRef.value?.classList.remove("border-red-400")
    claveInputRef.value?.classList.remove("border-2")
  }

  if (myForm.recuerdame) {
    localStorage.setItem("usuario", myForm.usuario)
  } else {
    localStorage.removeItem("usuario")
  }

  const success = await authStore.onLogin(myForm.usuario, myForm.clave);

  if (success) return;

  toast.error('Usuario/credenciales son incorrectas');

}

watchEffect(() => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    myForm.usuario = usuario;
    myForm.recuerdame = true;
  }
});
</script>

<style scoped></style>
