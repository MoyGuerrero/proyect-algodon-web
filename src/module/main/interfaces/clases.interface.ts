export interface Clases {
  ok: boolean;
  message: string;
  statusCode: number;
  data: Datos[];
}

export interface Datos {
  idclasesenc: number;
  idclasificacion: number;
  clave: string;
  descripcion: string;
}
