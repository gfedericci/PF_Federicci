import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../modules/shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let authS: AuthService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        OverlayModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        MatSnackBar,
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
    })
    .compileComponents();

    authS = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('Perfil: ADMIN', () => {
      authS.admin = true;
      component.ngOnInit();
      expect(!!component.columnas.find(col => col == 'Actions')).toBeTruthy();
    
  });

  it('Perfil: COMÚN', () => {
    authS.admin = false;
    component.ngOnInit();
    expect(!!component.columnas.find(col => col == 'Actions')).toBeFalsy();
  });


});
