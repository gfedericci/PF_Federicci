import { createReducer, on } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
import {setAlumnosList, addCursante, removeCursante, updateCursante} from './alumnos.actions'

export const initialState: Alumno[] = [];

export const alumnosReducer = createReducer(
  initialState,
  on(setAlumnosList, (_, { alumnos }) => alumnos),
  on(addCursante, (state, {alumno}) => [...state, alumno]),
  on(removeCursante, (state, {id}) => {var alumnos = [...state]; alumnos.splice(id, 1); return alumnos;}),
  on(updateCursante, (state, {id, alumno}) => {var alumnos = [...state]; alumnos[id] = alumno; return alumnos;}),
);