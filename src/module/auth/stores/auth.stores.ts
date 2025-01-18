import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { AuthStatus, type Data } from "../interfaces";
import { loginAction } from "../actions/login.action";
import { useLocalStorage } from "@vueuse/core";
import { RenewToken } from "../actions";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export const useAuthStore = defineStore('auth', () => {

  const authStatus = ref(AuthStatus.Checking);
  const router = useRouter();

  const user = ref<Data | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const toast = useToast();


  const onLogin = async (usuario: string, clave: string) => {
    try {
      const loginResp = await loginAction(usuario, clave);

      if (!loginResp.ok) {
        logout();
        toast.error(loginResp.msg)
        return false;
      }
      console.log(loginResp.user);

      user.value = loginResp.user;
      token.value = loginResp.token;

      authStatus.value = AuthStatus.Autenticado;
      toast.success("Bienvenido " + user.value.nombre);

      return true;

    } catch (error) {
      console.log(error);
      return logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('path')
    authStatus.value = AuthStatus.NoAutenticado
    user.value = undefined;
    token.value = "";
  }

  const onLogout = () => {
    logout();
    router.replace({ name: 'login' })
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
    getAvatar: computed(() => user.value?.avatar),
    onLogin,
    checkStatusAuth,
    onLogout
  }
})
