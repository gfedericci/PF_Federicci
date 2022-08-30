import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAlumnoComponent } from '../../layout/form-alumno/form-alumno.component';
import { FormCursoComponent } from '../../layout/form-curso/form-curso.component';
import { FormUsuarioComponent } from '../../layout/form-usuario/form-usuario.component';
import { FormAlumnosCursoComponent } from 'src/app/layout/form-alumnos-curso/form-alumnos-curso.component';
import { TableComponent } from '../../layout/table/table.component';
import { TableUsuariosComponent } from '../../layout/table-usuarios/table-usuarios.component';
import { TableCursosComponent } from '../../layout/table-cursos/table-cursos.component';
import { TableAlumnosCursoComponent } from 'src/app/layout/table-alumnos-curso/table-alumnos-curso.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FormAlumnoComponent,
    FormCursoComponent,
    FormUsuarioComponent,
    FormAlumnosCursoComponent,
    TableComponent,
    TableCursosComponent,
    TableUsuariosComponent,
    TableAlumnosCursoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ABMModule { }
