import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { AuthStatus } from '../interfaces';
import { useAuthStore } from '../stores/auth.stores';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {


  const authStore = useAuthStore();
  await authStore.checkStatusAuth();

  if (authStore.authStatus === AuthStatus.NoAutenticado) { next({ name: "login" }) } else { next(); }
};

export default isAuthenticatedGuard;
