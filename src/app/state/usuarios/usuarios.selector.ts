import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
 
export const selectUsuariosList = createFeatureSelector<Usuario[]>('usuarios');

export const getUsuarios = createSelector(
    selectUsuariosList,
  (usuarios: Usuario[]) => usuarios
)

export const selectUser = (id: number) => createSelector(
    getUsuarios,
  (usuarios) => usuarios[id]
);

export const getUser = createFeatureSelector<Usuario>('user');

export const userLogued = createSelector(
  getUser,
  (user) => !!user.usuario
);

export const userAdmin = createSelector(
  getUser,
  (user) => user.admin
);