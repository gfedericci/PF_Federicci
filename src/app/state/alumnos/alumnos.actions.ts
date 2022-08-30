import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
 
export const addCursante = createAction(
  '[Alumnos Collection] Add Alumno',
  props<{ alumno: Alumno }>()
);

export const removeCursante = createAction(
  '[Alumnos Collection] Remove Alumno',
  props<{ id: number }>()
);
 
export const setAlumnosList = createAction(
  '[Alumnos API] Retrieve Alumno Success',
  props<{ alumnos: Alumno[] }>()
);

export const updateCursante = createAction(
  '[v API] Upodate Alumno Success',
  props<{ id:number, alumno: Alumno }>()
);