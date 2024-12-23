export interface RPMVENC {
  ok: boolean,
  message: string,
  statuscode: number,
  data: PMVENC[]
}

export interface PMVENC {
  idperfilenc: number,
  descripcion: string,
  idestatus: number,
  estatus: string,
  fechacreacion: string | Date,
  fechaactualizacion: string | Date
}
