import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/curso';
 
export const addCurso = createAction(
  '[Cursos Collection] Add Curso',
  props<{ curso: Curso }>()
);

export const removeCurso = createAction(
  '[Cursos Collection] Remove Curso',
  props<{ id: number }>()
);
 
export const setCursosList = createAction(
  '[Cursos API] Retrieve Curso Success',
  props<{ cursos: Curso[] }>()
);

export const updateCurso = createAction(
  '[Cursos API] Update Curso Success',
  props<{ id:number, curso: Curso }>()
);
