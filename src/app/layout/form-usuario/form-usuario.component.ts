import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/usuario';
import { AuthService } from '../../services/auth.service';
import { addUsuario } from '../../state/usuarios/usuarios.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {
  formUsuario!: FormGroup;
  hide: boolean = true;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.fb = fb;
  }

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      usuario: this.fb.control("", [Validators.required, Validators.minLength(3)]),
      password: this.fb.control("", [Validators.required, Validators.minLength(3)]),
      nombre: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      apellido: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      admin: this.fb.control(false),
    });
  }

  submit() {
    if (this.formUsuario.valid) {
      var nuevoUsuario: Usuario;
      nuevoUsuario = { ...this.formUsuario.value };
      this.authService.addUsuario(nuevoUsuario);
      this._snackBar.open('El usuario ha sido registrado', '✔️');

      this.router.navigate(['/usuarios/listadoUsuarios']);
    }
  }
}