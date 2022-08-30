import { Alumno } from "../alumno";
import { Usuario } from "../usuario";

export interface AppState {
    alumnos: Alumno[];
    usuarios: Usuario[];
  }