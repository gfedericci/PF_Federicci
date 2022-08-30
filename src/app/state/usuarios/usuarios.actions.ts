import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
 
export const addUsuario = createAction(
  '[Usuarios Collection] Add Usuario',
  props<{ usuario: Usuario }>()
);

export const removeUsuario = createAction(
  '[Usuarios Collection] Remove Usuario',
  props<{ id: number }>()
);
 
export const setUsuariosList = createAction(
  '[Usuarios API] Retrieve Usuario Success',
  props<{ usuarios: Usuario[] }>()
);

export const updateUsuario = createAction(
  '[User API] Update Usuario Success',
  props<{ id:number, usuario: Usuario }>()
);


export const setLogued = createAction(
    '[Usuarios Collection] Set logued',
   props<{ usuario: Usuario }>()
);
  
export const logout = createAction(
  '[Usuarios Collection] Logout'
);

