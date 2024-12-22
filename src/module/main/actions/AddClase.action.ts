import { authAPi } from "@/api/authApi"
import { isAxiosError } from "axios"

interface Clase {
  idclasesenc: number,
  idclasificacion: number,
  clave: string,
  Descripcion: string
}

interface SuccessOrFailed {
  ok: boolean,
  message: string
}

interface Response {
  ok: boolean,
  message: string,
  statuscode: number
}


export const addClase = async (value: Clase): Promise<SuccessOrFailed> => {
  try {


    const { data } = await authAPi.post<Response>("/catalogos/agregar_clase", value, {
      headers: {
        "Content-Type": 'application/json'
      }
    });

    return {
      ok: true,
      message: data.message
    }

  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status >= 400) {
      console.log({ error });
      return {
        ok: false,
        message: error.response.data.message
      }
    }
    console.log({ error });

    throw new Error("Succedio un error hablar con el administrador del sistema");
  }
}
