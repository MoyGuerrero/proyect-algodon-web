import { authAPi } from "@/api/authApi"
import { isAxiosError } from "axios";

interface Response {
  ok: boolean;
  message: string;
  statuscode: number;
  data: Clientes[]
}

export interface Clientes {
  idcliente: number;
  nombre: string;
  rfc: string;
  calle: string;
  numext: string;
  colonia: string;
  codigopostal: string;
  municipio: string;
  estado: string;
  pais: string;
  nombrecontacto: string;
  mail: string;
  telefono: string;
}

interface Success {
  ok: true;
  message: string;
  datos: Clientes[]
}

interface Failed {
  ok: false,
  message: string
}


export const getClientes = async (idcliente: number, nombre: string, endpoint: string): Promise<Success | Failed> => {
  try {
    const { data } = await authAPi.get<Response>(`/catalogos/${endpoint}/${idcliente}/${nombre}`);

    return {
      ok: true,
      message: data.message,
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
