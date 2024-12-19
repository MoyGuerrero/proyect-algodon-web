import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";


interface Success {
  ok: true;
  message: string;
}
interface Failed {
  ok: false;
  message: string;
}


interface Response {
  ok: boolean,
  message: string,
  statusCode: number,
}

interface Values {
  idperfildet: number;
  idperfilenc: number;
  idclasesenc: number;
  diferencial: number;
}

export const addPerfilVentaDet = async (values: Values[]): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.post<Response>('/catalogos/agregar_perfil_venta_det', values, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      ok: true,
      message: data.message,
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
