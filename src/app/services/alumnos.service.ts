import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Alumno } from '../alumno';
import { Store } from '@ngrx/store';
import { addCursante, removeCursante, setAlumnosList, updateCursante } from '../state/alumnos/alumnos.actions';
import { getAlumnos, selectAlumno } from '../state/alumnos/alumnos.selector';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private urlAPI = environment.URLAPI + 'alumnos';

  listadoAlumnos: Alumno[] = [];
  alumnos$!: Promise<boolean>;
  
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store) { 
    this.loadAlumnos();
  }

  public loadAlumnos() {
      this.httpClient
          .get<Alumno[]>(this.urlAPI)
          .subscribe(alumnos =>{
              this.store.dispatch(setAlumnosList({alumnos}));
          });
    }

  public addAlumno(alumno: Alumno) {
    this.httpClient.post<Alumno>(this.urlAPI, alumno)
                  .subscribe((nuevo) => {
                      alumno.id = nuevo.id;
                      this._snackBar.open('El alumno ha sido registrado');
                      this.store.dispatch(addCursante({alumno: alumno}));
    });
  }

  public removeAlumno(id: number) {
    this.store.select(getAlumnos)
              .subscribe( alumnos => {
                  var alumno = alumnos[id];
                  this.httpClient
                  .delete(this.urlAPI + '/' + alumno.id)
                  .subscribe(() => { 
                    this._snackBar.open('El alumno ha sido eliminado');
                    this.store.dispatch(removeCursante({id}));
                  });
              }).unsubscribe();
  }

  public updateAlumno(id: number, alumno: Alumno) {
    this.store.select(selectAlumno(id))
    .subscribe( selected => {
        this.httpClient.put<Alumno>(this.urlAPI + '/' + selected.id, alumno)
                      .subscribe((data) => {
                        alumno.id = data.id;
                        this._snackBar.open('Alumno actualizado');
                        this.store.dispatch(updateCursante({id, alumno}));
                      });
        })
        .unsubscribe();
  }

  public async getAlumno(id: number): Promise<Alumno> {
    return new Promise(r => 
      this.store.select(selectAlumno(id))
      .subscribe(selected => r(selected))
      .unsubscribe()
  );
  }

  public get alumnos () : Alumno[] {
    return this.listadoAlumnos;
  }
}
