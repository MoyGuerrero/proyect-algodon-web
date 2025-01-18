export interface AuthResponse {
  ok: boolean;
  message: string;
  statusCode: number;
  data: Data;
  token: string;
}

export interface Data {
  validacion: number;
  idUsuario: string;
  nombre: string;
  usuario: string;
  clave: string;
  tipo: string;
  descripcion: string;
  avatar: string;
}
