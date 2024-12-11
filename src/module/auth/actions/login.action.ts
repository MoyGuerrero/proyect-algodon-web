import { isAxiosError } from "axios";
import { authAPi } from "../../../api/authApi"
import type { AuthResponse, UsuarioBD } from "../interfaces/auth.response";
interface LoginError {
  ok: false,
  msg: string
}
interface LoginSuccess {
  ok: true,
  user: UsuarioBD,
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
      user: data.usuarioBd,
      token: data.token
    }

  } catch (error) {

    if (isAxiosError(error) && error.status === 404) {
      return {
        ok: false,
        msg: 'Usuario o credenciales incorrectas'
      }
    }
    // alert(JSON.stringify(error))
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }
}
