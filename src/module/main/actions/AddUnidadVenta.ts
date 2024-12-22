import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface VentaUnidad {
  idperfilenc: number;
  descripcion: string;
  valorunidad: number;
  idestatus: number;
  fechacreacion: Date | string;
  fechaactualizacion: Date | string;
}
interface SuccessorFailed {
  ok: boolean,
  message: string
}

interface Response {
  ok: boolean,
  message: string,
  status: number
}


export const agregarUnidadVenta = async (venta: VentaUnidad): Promise<SuccessorFailed> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idperfilenc, ...params } = venta;

    const { data } = await authAPi.post<Response>('/catalogos/agregar_unidad_venta', venta, {
      headers: {
        "Content-Type": "application/json"
      }
    });

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
