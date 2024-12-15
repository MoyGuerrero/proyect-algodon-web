export interface UnidadVenta {
  ok: boolean;
  message: string;
  statusCode: number;
  data: UVenta[];
}

export interface UVenta {
  idperfilenc: number;
  descripcion: string;
  valorunidad: number;
  idestatus: number;
  estatus: string;
  fechacreacion: Date;
  fechaactualizacion: Date;
}
