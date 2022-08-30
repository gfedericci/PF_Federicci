import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTable } from '@angular/material/table';
import { Curso } from 'src/app/curso';
import { CursosService } from '../../services/cursos.service';
import { AuthService } from '../../services/auth.service';
import { selectCursosList } from '../../state/cursos/cursos.selector';

@Component({
  selector: 'app-table-cursos',
  templateUrl: './table-cursos.component.html',
  styleUrls: ['./table-cursos.component.scss']
})
export class TableCursosComponent implements OnInit {

  columnas = ["Nombre", "Horas", "Clases", "Profesor"];
  
  cursos$ = this.store.select(selectCursosList);

  @ViewChild(MatTable)
  table!: MatTable<Curso>;

  constructor(public cursosService: CursosService, private authS: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.columnas = ["Nombre", "Horas", "Clases", "Profesor"];
    if (this.authS.admin) {
      this.columnas.push("Actions")
    }
  }

  eliminar(index: number) {
    this.cursosService.removeCurso(index);
    this.table.renderRows();
  }

}
