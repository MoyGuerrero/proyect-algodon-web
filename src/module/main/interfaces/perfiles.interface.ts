
export interface Response {
  ok: boolean,
  message: string,
  statuscode: number,
  data: PerfilesDet[]
}


export interface PerfilesDet {
  idperfildet: number,
  idperfilenc: number,
  rango1: number,
  rango2: number,
  castigo: number
}
