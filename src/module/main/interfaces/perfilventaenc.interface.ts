export interface PerfilVentaEnc {
  ok: boolean;
  message: string;
  statusCode: number;
  data: datosEnc[];
}

export interface datosEnc {
  idperfilenc: number;
  descripcion: string;
  idestatus: number;
  estatus: string;
  fechacreacion: Date;
  fechaactualizacion: Date;
}
