import { authAPi } from "@/api/authApi"
import type { AuthResponse, Data } from "../interfaces";
import { isAxiosError } from "axios";
interface CheckError {
  ok: false,
}
interface CheckSuccess {
  ok: true,
  user: Data,
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

    const newData: Data = {
      ...data.data,
      avatar: data.data.avatar === null || data.data.avatar === '' ? `http://localhost/noImage/no-image.png` : `http://localhost/empleados/${data.data.avatar}`,
    }

    return {
      ok: true,
      user: newData,
      token: data.token
    }

  } catch (error) {
    if (isAxiosError(error) && error.response!.status >= 401) {
      return {
        ok: false,
      }
    }
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }
}
