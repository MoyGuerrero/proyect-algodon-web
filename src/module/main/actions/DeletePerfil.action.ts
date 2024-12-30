import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface SuccessOrFailed {
  ok: boolean,
  message: string,
}

interface Response {
  ok: boolean,
  message: string,
  statuscode: number
}

export const DeletePerfil = async (position: number, idperfildet: number): Promise<SuccessOrFailed> => {
  try {
    const { data } = await authAPi.delete<Response>(`/catalogos/${position}/eliminar_perfil/${idperfildet}`);
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
