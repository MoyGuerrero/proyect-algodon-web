export interface AuthResponse {
  usuarioBd: UsuarioBD;
  token: string;
}

export interface UsuarioBD {
  validacion: number;
  idUsuario: string;
  nombre: string;
  usuario: string;
  clave: string;
  tipo: string;
  descripcion: string;
}
