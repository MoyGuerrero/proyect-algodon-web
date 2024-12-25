import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface SuccessOrFailed {
  ok: boolean,
  message: string
}

interface Values {
  idperfildet: number,
  idperfilenc: number,
  rango1: number,
  rango2: number,
  castigo: number,
}

interface Response {
  ok: boolean,
  message: string,
  statuscode: number
}

export const AddPerfilDeduccionDet = async (values: Values[]): Promise<SuccessOrFailed> => {
  try {

    const { data } = await authAPi.post<Response>("/catalogos/agregar_perfiles_deduccion_enc", values, { headers: { "Content-Type": "application/json" } })

    return {
      ok: true,
      message: data.message
    }

  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status >= 400) {
      return {
        ok: false,
        message: error.response.data.message
      }
    }
    console.log({ error });

    throw new Error("Succedio un error hablar con el administrador del sistema");
  }
}
