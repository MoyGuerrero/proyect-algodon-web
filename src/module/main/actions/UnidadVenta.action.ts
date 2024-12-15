import { authAPi } from "@/api/authApi"
import type { UnidadVenta, UVenta } from "../interfaces/UnidadVenta.interface";
import { isAxiosError } from "axios";

interface Success {
  ok: true,
  datos: UVenta[]
}

interface Failed {
  ok: false,
  message: string
}

export const getUnidadVenta = async (): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.get<UnidadVenta>('/catalogos/unidad_venta', {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      ok: true,
      datos: data.data
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
