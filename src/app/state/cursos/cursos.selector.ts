import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Curso } from 'src/app/curso';
 
export const selectCursosList = createFeatureSelector<Curso[]>('cursos');

export const selectCurso = (index: number) => createSelector(
  selectCursosList,
  (cursos) => cursos[index]
);
