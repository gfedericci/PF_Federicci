import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Alumno } from '../../alumno';
import { AuthService } from '../../services/auth.service';
import { CursosService } from '../../services/cursos.service';
import { selectCursosList } from '../../state/cursos/cursos.selector';

@Component({
  selector: 'app-table-alumnos-curso',
  templateUrl: './table-alumnos-curso.component.html',
  styleUrls: ['./table-alumnos-curso.component.scss']
})
export class TableAlumnosCursoComponent implements OnInit {

  columnas: String[] = [];
  indexCurso!: number;
  
  @ViewChild(MatTable)
    table!: MatTable<Alumno>;
  

  constructor(protected cursosService: CursosService, private authS: AuthService, private route: ActivatedRoute, private store: Store) { }

  cursos$ = this.store.select(selectCursosList);

  ngOnInit(): void {
    this.indexCurso = Number(this.route.snapshot.paramMap.get('index'));
    this.cursosService.getAlumnosCurso(this.indexCurso);
    this.columnas = ["NombreCompleto", "Email", "Activo"];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number): void {
    this.cursosService.eliminarAlumno(index);
    this.table.renderRows();
  }

}
