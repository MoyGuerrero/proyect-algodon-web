import { authAPi } from "@/api/authApi";
import type { Data, datosEnc, PerfilVentaDet, PerfilVentaEnc } from "../interfaces";
import { isAxiosError } from "axios";

interface Success {
  ok: true,
  perfil1: Data[],
  perfil2: datosEnc[]
}

interface Failed {
  ok: false,
  message: string
}


export const perfilVentas = async (idperfilenc: number): Promise<Success | Failed> => {

  try {

    const [perfilventaenc, perfilventadet] = await Promise.all([
      authAPi.get<PerfilVentaEnc>('/catalogos/perfilventaenc', {
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      authAPi.get<PerfilVentaDet>('/catalogos/perfilventadet/' + idperfilenc, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    ]);

    return {
      ok: true,
      perfil1: perfilventadet.data?.data,
      perfil2: perfilventaenc.data?.data
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
