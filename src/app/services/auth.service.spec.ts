import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('Usuario incorrecto', () => {
    service.login('error', '1111');
    expect(service.admin).toBeFalsy();
  });
  
  it('Usuario > Común', () => {
    service.login('mmunarriz', '1234');
    expect(service.admin).toBeFalsy();
  });
  
  it('Usuario > Admin', () => {
    service.login('gfedericci', '1234');
    expect(service.admin).toBeTruthy();
  });
});
