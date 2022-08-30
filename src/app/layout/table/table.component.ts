import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { AuthService } from '../../services/auth.service';
import { getAlumnos } from '../../state/alumnos/alumnos.selector';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Curso", "Activo"];
  alumnos$ = this.store.select(getAlumnos);

  @ViewChild(MatTable)
  table!: MatTable<Alumno>;

  constructor(public alumnosService: AlumnosService, private authS: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Curso", "Activo"];
    if (this.authS.admin){
      this.columnas.push("Actions")
    }
  }

  eliminar(index: number) {
    this.alumnosService.removeAlumno(index);
    this.table.renderRows();
  }

}
