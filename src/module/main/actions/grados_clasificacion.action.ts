import { isAxiosError } from "axios"
import type { DatosGrados, GradosClasificacion } from "../interfaces/grados_clasificacion.interface"
import { authAPi } from "@/api/authApi"

interface Success {
  ok: true,
  datos: DatosGrados[]
}

interface Failed {
  ok: false,
  message: string
}

export const getGradosClasificacion = async (): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.get<GradosClasificacion>('/catalogos/grados_clasificacion');
    // console.log(data);

    return {
      ok: true,
      datos: data.data
    }

  } catch (error) {
    if (isAxiosError(error) && error.response!.status >= 400) {
      return {
        ok: false,
        message: error.response?.data.message
      }
    }
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }
}
