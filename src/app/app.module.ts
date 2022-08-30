import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { ABMModule } from './modules/abm/abm.module';
import { FormAlumnoComponent } from './layout/form-alumno/form-alumno.component';
import { TableComponent } from './layout/table/table.component';
import { TableCursosComponent } from './layout/table-cursos/table-cursos.component';
import { TableUsuariosComponent } from './layout/table-usuarios/table-usuarios.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './layout/login/login.component';
import { alumnosReducer } from './state/alumnos/alumnos.reducer';
import { userLog, usuarioReducer } from './state/usuarios/usuarios.reducer';
import { cursosReducer } from './state/cursos/cursos.reducer';
import { FormCursoComponent } from './layout/form-curso/form-curso.component';
import { FormUsuarioComponent } from './layout/form-usuario/form-usuario.component';
import { TableAlumnosCursoComponent } from './layout/table-alumnos-curso/table-alumnos-curso.component';
import { FormAlumnosCursoComponent } from './layout/form-alumnos-curso/form-alumnos-curso.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'alumnos', children: [
      { path: 'listadoAlumnos', component: TableComponent, canActivate: [LoginGuard] },
      { path: 'nuevo', component: FormAlumnoComponent, canActivate: [AuthGuard] },
      { path: 'editar/:index', component: FormAlumnoComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'cursos', children: [
      { path: 'listadoCursos', component: TableCursosComponent, canActivate: [LoginGuard] },
      { path: 'nuevo', component: FormCursoComponent, canActivate: [AuthGuard] },
      { path: 'editar/:index', component: FormCursoComponent, canActivate: [AuthGuard] },
      { path: 'alumnos/:index', component: TableAlumnosCursoComponent, canActivate: [AuthGuard] },
      { path: 'alumnos/agregar/:indexCurso', component: FormAlumnosCursoComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'usuarios', children: [
      { path: 'listadoUsuarios', component: TableUsuariosComponent, canActivate: [LoginGuard] },
      { path: 'nuevo', component: FormUsuarioComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ABMModule,
    SharedModule,
    CoreModule,
    OverlayModule,
    StoreModule.forRoot({ alumnos: alumnosReducer, usuarios: usuarioReducer, user: userLog, cursos: cursosReducer })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
