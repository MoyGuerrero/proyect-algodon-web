import { authAPi } from "@/api/authApi"
import type { AuthResponse, UsuarioBD } from "../interfaces";
import { isAxiosError } from "axios";
interface CheckError {
  ok: false,
}
interface CheckSuccess {
  ok: true,
  user: UsuarioBD,
  token: string
}


export const RenewToken = async (): Promise<CheckError | CheckSuccess> => {
  try {

    const localToken = localStorage.getItem('token');
    if (!localToken) {
      return {
        ok: false
      };
    }
    const { data } = await authAPi.get<AuthResponse>('/usuario/renewToken');

    return {
      ok: true,
      user: data.usuarioBd,
      token: data.token
    }

  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      }
    }
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }
}
