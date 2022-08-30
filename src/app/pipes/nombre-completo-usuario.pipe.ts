import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../usuario';

@Pipe({
  name: 'nombreCompletoUsuario'
})
export class NombreCompletoUsuarioPipe implements PipeTransform {

  transform(usuario: Usuario): string {
    return usuario.nombre + ' ' + usuario.apellido;
  }

}