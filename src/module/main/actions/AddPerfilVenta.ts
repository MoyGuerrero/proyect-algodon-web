import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface Success {
  ok: true;
  message: string;
  id: number
}

interface Failed {
  ok: false;
  message: string;
}

interface Response {
  ok: boolean;
  message: string;
  status: number,
  id: number
}

interface sendData {
  idperfilenc: number;
  descripcion: string;
  idestatus: number;
  fechacreacion: string;
  fechaactualizacion: string;
}


export const addPerfilVentaEnc = async (values: sendData): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.post<Response>('/catalogos/agregar_perfil_venta_enc', values, {
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
