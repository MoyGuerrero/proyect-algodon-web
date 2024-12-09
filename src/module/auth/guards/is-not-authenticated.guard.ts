import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { AuthStatus } from '../interfaces';
import { useAuthStore } from '../stores/auth.stores';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {


  const authStore = useAuthStore();
  await authStore.checkStatusAuth();
  if (authStore.authStatus === AuthStatus.Autenticado) { next({ name: "main" }) } else { next(); }
};

export default isNotAuthenticatedGuard;
