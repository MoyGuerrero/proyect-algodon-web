import { isAxiosError } from "axios"
import type { PMVENC, RPMVENC } from "../interfaces/PMVENC.interface"
import { authAPi } from "@/api/authApi"

interface Success {
  ok: true,
  message: string,
  datos: PMVENC[]
}

interface Failed {
  ok: false,
  message: string
}

export const getPMVENC = async (posicion: number): Promise<Success | Failed> => {
  try {

    const { data } = await authAPi.get<RPMVENC>(`/catalogos/obtener_perfiles_deduccion/${posicion}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      ok: true,
      message: data.message,
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
