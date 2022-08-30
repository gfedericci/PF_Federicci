import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsuariosComponent } from './table-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TableUsuariosComponent', () => {
  let component: TableUsuariosComponent;
  let fixture: ComponentFixture<TableUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUsuariosComponent ],
      imports: [ HttpClientModule, MatSnackBarModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
