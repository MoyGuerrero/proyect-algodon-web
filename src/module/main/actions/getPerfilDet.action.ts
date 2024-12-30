import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";
import type { PerfilesDet, Response } from "../interfaces/perfiles.interface";

interface Success {
  ok: boolean,
  message: string,
  datos: PerfilesDet[]
}

interface Failed {
  ok: false,
  message: string
}

export const getPerfilesDeducciones = async (id: number, position: number): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.get<Response>(`/catalogos/get_perfiles_deducciones/${id}/${position}`, { headers: { "Content-Type": "application/json" } });
    return {
      ok: true,
      message: data.message,
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
