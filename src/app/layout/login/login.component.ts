import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authS: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  formLogin!: FormGroup;
  submited = false;
  wrongUser: boolean = true;

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formLogin = this.fb.group({
      user: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      pass: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    });
  }

  async submit() {
    this.submited = true;
    if (this.formLogin.valid) {
      var user = this.formLogin.get('user')?.value;
      var pass = this.formLogin.get('pass')?.value;
      var userType = await this.authS.login(user, pass);
      this.wrongUser = false;
      switch (userType) {
        case 'invalid': this.wrongUser = true; break;
      }
      if (!this.wrongUser) {
        var message = 'Ingreso exitoso';
        if (userType == 'admin')
          message += ' (Admin)';
        this._snackBar.open(message);
        this.router.navigate(['/alumnos/listadoAlumnos']);
      }
    }

  }
}
