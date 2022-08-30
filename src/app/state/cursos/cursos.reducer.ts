import { createReducer, on } from '@ngrx/store';
import { Curso } from 'src/app/curso';
import {setCursosList, addCurso, removeCurso, updateCurso} from './cursos.actions'


export const initialState: Curso[] = [];

export const cursosReducer = createReducer(
  initialState,
  on(setCursosList, (_, { cursos }) => cursos),
  on(addCurso, (state, {curso}) => [...state, curso]),
  on(removeCurso, (state, {id}) => {var cursos = [...state]; cursos.splice(id, 1); return cursos;}),
  on(updateCurso, (state, {id, curso}) => {var cursos = [...state]; cursos[id] = curso; return cursos;}),
);