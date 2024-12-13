import { authAPi } from "@/api/authApi"
import type { Clases, Datos } from "../interfaces/clases.interface";
import { isAxiosError } from "axios";

interface Success {
  ok: true,
  datos: Datos[]
}

interface Failed {
  ok: false,
  message: string
}

export const getClases = async (): Promise<Success | Failed> => {
  try {

    const { data } = await authAPi.get<Clases>('/catalogos/clases');

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

    throw new Error("Succedio un error hablar con el administrador del sistema");

  }
}
