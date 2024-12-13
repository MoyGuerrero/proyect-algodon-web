import { isAxiosError } from "axios";
import { authAPi } from "../../../api/authApi"
import type { AuthResponse, Data } from "../interfaces/auth.response";
interface LoginError {
  ok: false,
  msg: string
}
interface LoginSuccess {
  ok: true,
  user: Data,
  token: string
}

export const loginAction = async (usuario: string, clave: string): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await authAPi.post<AuthResponse>('/usuario/login', {
      usuario,
      clave
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      ok: true,
      user: data.data,
      token: data.token
    }

  } catch (error) {

    if (isAxiosError(error) && error.response!.status >= 400) {
      return {
        ok: false,
        msg: error.response?.data.message
      }
    }
    // alert(JSON.stringify(error))
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }
}
