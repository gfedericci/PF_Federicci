import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { selectUsuariosList } from 'src/app/state/usuarios/usuarios.selector';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-table-usuarios',
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.scss']
})
export class TableUsuariosComponent implements OnInit {

  constructor(protected authS: AuthService, private store: Store) { }

  columnas = ['Usuario', 'Nombre', 'Email', 'Admin', 'Actions']
  @ViewChild(MatTable)
  table!: MatTable<Usuario>;
  usuarios$ = this.store.select(selectUsuariosList);

  ngOnInit(): void {
    this.columnas = ['Usuario', 'Nombre', 'Email', 'Admin'];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number) {
    this.authS.eliminarUser(index);
    this.table.renderRows();
  }

}
