import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface Response {
  ok: boolean,
  message: string,
  statuscode: number,
  id: number
}

interface Success {
  ok: boolean,
  message: string,
  id: number
}

interface Failed {
  ok: false,
  message: string
}

interface Values {
  idperfilenc: number,
  descripcion: string,
  idestatus: number,
  fechacreacion: string | Date,
  fechaactualizacion: string | Date,
}

export const AddPerfilDeduccionEnc = async (values: Values, position: number): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.post<Response>(`/catalogos/agregar_perfiles_deduccion/${position}`, values, { headers: { "Content-Type": "application/json" } });
    return {
      ok: true,
      message: data.message,
      id: data.id
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
