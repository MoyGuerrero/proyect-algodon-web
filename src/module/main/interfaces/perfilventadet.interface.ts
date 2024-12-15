export interface PerfilVentaDet {
  ok: boolean;
  message: string;
  statusCode: number;
  data: Data[];
}

export interface Data {
  idperfildet: number;
  idperfilenc: number;
  idclasesenc: number;
  idclasificacion: number;
  descripcion: string;
  clave: string;
  diferencial: number;
}
