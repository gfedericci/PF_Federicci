import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addUsuario, logout, removeUsuario, setLogued, setUsuariosList } from '../state/usuarios/usuarios.actions';
import { selectUsuariosList } from '../state/usuarios/usuarios.selector';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LINK = environment.URLAPI + 'usuarios';
  admin = false;

  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store) {
    this.getUsuarios();
   }

   getUsuarios() {
    this.httpClient
        .get<Usuario[]>(this.LINK)
        .subscribe(usuarios => {
         this.store.dispatch(setUsuariosList({usuarios}));
         this.store.select(selectUsuariosList);
        });
}

addUsuario(nuevoUsuario: Usuario) {
 this.httpClient
   .post<Usuario>(this.LINK, nuevoUsuario)
   .subscribe(datos => {
    nuevoUsuario.id = datos.id;
     this._snackBar.open('El usuario ha sido registrado')
     this.store.dispatch(addUsuario({usuario: nuevoUsuario}));
   });
}

eliminarUser(id: number) {
 this.store.select(selectUsuariosList)
           .subscribe(users => {
             if (users.length > 1) {
               var url = this.LINK + '/' + users[id].id;
               this.httpClient
               .delete(url)
               .subscribe(() =>{
                 this._snackBar.open('El usuario ha sido eliminado');
                 this.store.dispatch(removeUsuario({id}));
               });
             } else {
               this._snackBar.open('No se puede eliminar el único usuario existente');
             }
           })
           .unsubscribe();
 
}

 async login(user: string, pass: string): Promise<string> {
   var users = await firstValueFrom(this.store.select(selectUsuariosList));
   var userLogueado = users.find(usuario => usuario.usuario == user && usuario.password == pass);
   this.admin = false;
   if (!!userLogueado) {
     this.store.dispatch(setLogued({usuario: userLogueado}));
     if (userLogueado.admin) {
       this.admin = true;
       return 'admin';
     }
     return 'user';
   }
 return 'invalid';
 }

 logout() {
   this.store.dispatch(logout());
   this.router.navigate(['/']);
 }

 logAdmin() {
   var fakeAdmin = new Usuario();
   fakeAdmin.admin = true;
   fakeAdmin.usuario = 'Fake Admin';
   this.store.dispatch(setLogued({usuario: fakeAdmin}));
   this.admin = true;
 }
}
