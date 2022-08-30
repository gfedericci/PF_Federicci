import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
import {setUsuariosList, addUsuario, removeUsuario, updateUsuario, setLogued, logout} from './usuarios.actions'

export const initialState: Usuario[] = [];
export const user: Usuario = {
    usuario: '',
    password: '',
    admin: false,
    id: 0
};

export const usuarioReducer = createReducer(
  initialState,
  on(setUsuariosList, (_, { usuarios }) => usuarios),
  on(addUsuario, (state, {usuario}) => [...state, usuario]),
  on(removeUsuario, (state, {id}) => {var users = [...state]; users.splice(id, 1); return users;}),
  on(updateUsuario, (state, {id, usuario}) => {var users = [...state]; users[id] = usuario; return users;}),
);

export const userLog = createReducer(
    user,
    on(setLogued, (_, {usuario}) => usuario),
    on(logout, (_) => new Usuario()),
)