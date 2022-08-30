import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('Usuario inexistente', () => {
    service.logIn('wrong', '1');
    expect(!!localStorage.getItem('token')).toBeFalsy();
    expect(!!localStorage.getItem('admin')).toBeFalsy();
    service.logOut();
  });

  it('Usuario Común', () => {
    service.logIn('asd', '1234');
    expect(!!localStorage.getItem('token')).toBeTruthy();
    expect(!!localStorage.getItem('admin')).toBeFalsy();
    service.logOut();
  });

  it('Usuario Admin', () => {
    service.logIn('admin', '1234');
    expect(!!localStorage.getItem('token')).toBeTruthy();
    expect(!!localStorage.getItem('admin')).toBeTruthy();
    service.logOut();
  });
});
