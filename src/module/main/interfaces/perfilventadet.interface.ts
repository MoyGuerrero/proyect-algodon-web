export interface PerfilVentaDet {
  ok: boolean;
  message: string;
  statusCode: number;
  data: Data[];
}

export interface Data {
  idperfildet: number; //0
  idperfilenc: number; // del returno del insert que se hizo primero
  idclasesenc: number;
  idclasificacion: number;
  descripcion: string;
  clave: string;
  diferencial: number;
}
