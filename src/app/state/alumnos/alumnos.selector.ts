import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
 
export const selectAlumnosList = createFeatureSelector<Alumno[]>('alumnos');

export const getAlumnos = createSelector(
  selectAlumnosList,
  (alumnos: Alumno[]) => alumnos
)

export const selectAlumno = (index: number) => createSelector(
  getAlumnos,
  (alumnos) => alumnos[index]
);