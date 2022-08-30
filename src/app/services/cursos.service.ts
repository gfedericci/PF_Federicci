import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Curso } from '../curso';
import { Alumno } from '../alumno';
import { addCurso, removeCurso, setCursosList, updateCurso } from '../state/cursos/cursos.actions';
import { selectCurso } from '../state/cursos/cursos.selector';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private urlAPI = environment.URLAPI + "cursos";
  private urlAlumnosCursos = '';

  listadoCursos: Curso[] = [];
  cursos$!: Promise<boolean>;
  alumnosCurso: Alumno[] = [];

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store) {
    this.loadCursos();
  }

  public loadCursos() {
    this.cursos$ = new Promise<boolean>((res, _) => {
      this.httpClient
        .get<Curso[]>(this.urlAPI)
        .subscribe(cursos => {
          this.store.dispatch(setCursosList({ cursos }))
          res(true);
        });
    });
  }

  public addCurso(curso: Curso) {
    this.httpClient.post<Curso>(this.urlAPI, curso).subscribe(datos => {
      curso.id = datos.id;
      this._snackBar.open('El curos ha sido registrado');
      this.store.dispatch(addCurso({ curso: curso }));
    });
  }

  public removeCurso(id: number) {
    this.store.select(selectCurso(id))
      .subscribe(curso => {
        this.httpClient.delete(this.urlAPI + '/' + curso.id)
          .subscribe(() => {
            this._snackBar.open('El curso ha sido eliminado')
            this.store.dispatch(removeCurso({ id }));
          });
      }).unsubscribe();
  }

  public updateCurso(id: number, cursoActualizado: Curso) {
    this.store.select(selectCurso(id))
      .subscribe(curso => {
        this.httpClient.put<Curso>(this.urlAPI + '/' + curso.id, cursoActualizado)
          .subscribe(() => {
            cursoActualizado.id = curso.id;
            this._snackBar.open('El curso ha sido actualizado');
            this.store.dispatch(updateCurso({ id, curso: cursoActualizado }));
          });
      })
      .unsubscribe();
  }

  public async getCurso(id: number): Promise<Curso> {
    await this.cursos$;
    return new Promise(r => r(this.listadoCursos[id]));
  }

  public get cursos(): Curso[] {
    return this.listadoCursos;
  }

  // Guarda los alumnos del curso en la lista del servicio.
  async getAlumnosCurso(idCurso: number): Promise<void> {
    return new Promise((res, _) => {
      this.store.select(selectCurso(idCurso))
        .subscribe(curso => {
          var id = curso.id;
          this.urlAlumnosCursos = this.urlAPI + '/' + id + '/alumnosCurso';
          this.alumnosCurso = [];
          this.httpClient
            .get(this.urlAlumnosCursos)
            .subscribe(alumnos => {
              this.alumnosCurso = [];
              (<Alumno[]>alumnos).forEach(alumno => this.alumnosCurso.push(alumno));
              res();
            });
        }).unsubscribe();
    });

  }

  addAlumnos(selected: Alumno[]) {
    var INTERVAL = 300;

    var promise = Promise.resolve();
    selected.forEach(el => {
      var n = { ...el };
      n.alumnoId = el.id;
      delete n.id;
      promise = promise.then(() => {
        this.httpClient
          .post<Alumno>(this.urlAlumnosCursos, n)
          .subscribe();
        return new Promise(res => {
          setTimeout(res, INTERVAL);
        });
      });
    });

    promise.then(() => {
      if (selected.length)
        this._snackBar.open('Los alumnos han sido agregados');
    });
  }

  eliminarAlumno(index: number) {
    var url = this.urlAlumnosCursos + '/' + this.alumnosCurso[index].id;
    this.httpClient
      .delete(url)
      .subscribe(() => {
        this._snackBar.open('El alumno ha sido quitado');
      });
    this.alumnosCurso.splice(index, 1);
  };
}