export interface GradosClasificacion {
  ok: boolean;
  message: string;
  statusCode: number;
  data: DatosGrados[];
}

export interface DatosGrados {
  idgradosclasificacion: number;
  gradocolor: string;
  trashid: number;
  descripcion: string;
  idclase: number;
  clave: string;
}

