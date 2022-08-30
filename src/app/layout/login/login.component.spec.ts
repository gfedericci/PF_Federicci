import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authS: AuthService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([{ path: '/alumnos/listadoAlumnos'}]),
        OverlayModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
    })
    .compileComponents();

    routerSpy = {navigate: jasmine.createSpy('navigate')};
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('No usuario Redirect', () => {
    component.formLogin.setValue({user: 'wrong', pass: 1111});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });

  it('usuario INVÁLIDO', () => {
    component.formLogin.setValue({user: 'wrong', pass: 1111});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();

  });

  it('usuario COMUN', () => {
    component.formLogin.setValue({user: 'comun', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
  });

  it('usuario ADMIN', () => {
    component.formLogin.setValue({user: 'admin', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
    expect(!!localStorage.getItem('admin')).toBeTruthy();
  });

  it('Usuario Redirect', () => {
    component.formLogin.setValue({user: 'admin', pass: 1234});
    component.submit();
    expect(!!localStorage.getItem('admin')).toBeTruthy();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
  });

  it('Form Inválido', () => {
    component.formLogin.setValue({user: 'a', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });
});
