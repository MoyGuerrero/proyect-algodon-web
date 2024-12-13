import { authAPi } from "@/api/authApi";
import { isAxiosError } from "axios";

interface Clientes {
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

interface SuccessOrFailed {
  ok: boolean,
  message: string
}
export const addClient = async (cliente: Clientes): Promise<SuccessOrFailed> => {
  try {
    const { data } = await authAPi.post('/catalogos/agregar_cliente', cliente, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      ok: true,
      message: data.message
    }

  } catch (error) {
    if (isAxiosError(error) && error.response!.status >= 400) {
      return {
        ok: false,
        message: error.response?.data.message
      }
    }
    console.log({ error });

    throw new Error("No se pudo realizar la petición")
  }

}
