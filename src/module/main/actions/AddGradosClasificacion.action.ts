import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface GC {
  Idgradosclasificacion: number,
  gradocolor: string,
  trashId: number,
  descripcion: string,
  idclase: number | string
}

interface Response {
  ok: boolean;
  message: string;
  status: number,
  id: number
}

interface Success {
  ok: true,
  message: string,
  id: number
}

interface Failed {
  ok: false,
  message: string,
}
export const addGC = async (values: GC): Promise<Failed | Success> => {
  try {
    const { data } = await authAPi.post<Response>('/catalogos/agregar_grados_clasificacion', values, {
      headers: {
        "Content-Type": "application/json"
      }
    });
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
