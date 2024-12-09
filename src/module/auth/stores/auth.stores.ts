import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { AuthStatus, type UsuarioBD } from "../interfaces";
import { loginAction } from "../actions/login.action";
import { useLocalStorage } from "@vueuse/core";
import { RenewToken } from "../actions";

export const useAuthStore = defineStore('auth', () => {

  const authStatus = ref(AuthStatus.Checking);

  const user = ref<UsuarioBD | undefined>();
  const token = ref(useLocalStorage('token', ''));


  const onLogin = async (usuario: string, clave: string) => {
    try {
      const loginResp = await loginAction(usuario, clave);

      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;

      authStatus.value = AuthStatus.Autenticado;

      return true;

    } catch (error) {
      console.log(error);
      return logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    authStatus.value = AuthStatus.NoAutenticado
    user.value = undefined;
    token.value = "";
  }

  const checkStatusAuth = async (): Promise<boolean> => {
    try {
      const statusResponse = await RenewToken();
      if (!statusResponse.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Autenticado;
      user.value = statusResponse.user;
      token.value = statusResponse.token;
      return true
    } catch (error) {
      logout();
      console.log(error);

      return false
    }
  }

  return {
    user,
    token,
    authStatus,
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuntenticado: computed(() => authStatus.value === AuthStatus.Autenticado),
    username: computed(() => user.value?.nombre),
    onLogin,
    checkStatusAuth
  }
})
