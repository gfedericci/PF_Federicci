import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../curso';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.scss']
})
export class FormAlumnoComponent implements OnInit {
  today = new Date();
  formAlumno!: FormGroup;
  index!: number;

  cursos!: Curso[];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private alumnosService: AlumnosService, private route: ActivatedRoute, private router: Router, private cursosService: CursosService) {
    this.fb = fb;
    this.cursos = this.cursosService.cursos;
  }

  ngOnInit(): void {
    var i = this.route.snapshot.paramMap.get('index');
    if (i == null)
      this.index = -1;
    else
      this.index = Number(i);

    var alumno = <Alumno>{};

    if (this.index > -1)
      this.alumnosService.getAlumno(this.index).then(a => { alumno = a; this.setForm(alumno); });

    this.setForm(alumno);
  }

  setForm(alumno: Alumno) {
    this.formAlumno = this.fb.group({
      nombre: this.fb.control(alumno.nombre, [Validators.required, Validators.minLength(2)]),
      apellido: this.fb.control(alumno.apellido, [Validators.required, Validators.minLength(2)]),
      fechaNacimiento: this.fb.control(alumno.fechaNacimiento, [Validators.required]),
      email: this.fb.control(alumno.email, [Validators.required, Validators.email]),
      activo: this.fb.control(alumno.activo, []),
      index: this.fb.control(alumno.id, [])
    });
  }

  submit() {
    if (this.index == -1) this.addAlumno()
    else this.editAlumno();
  }

  addAlumno() {
    if (this.formAlumno.valid) {
      var nuevoAlumno: Alumno;
      nuevoAlumno = { ...this.formAlumno.value };
      this.alumnosService.addAlumno(nuevoAlumno);

      this.router.navigate(['/alumnos/listadoAlumnos']);
    }
  }

  editAlumno() {
    if (this.formAlumno.valid) {
      var alumnoActualizado: Alumno;
      alumnoActualizado = { ...this.formAlumno.value };
      this.alumnosService.updateAlumno(this.index, alumnoActualizado);
      
      this.router.navigate(['/alumnos/listadoAlumnos']);
    }
  }
}