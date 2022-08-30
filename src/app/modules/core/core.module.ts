import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { ToolbarComponent } from '../../layout/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnosService } from '../../services/alumnos.service';
import { LoginComponent } from '../../layout/login/login.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    ToolbarComponent
  ],
  providers: [
    AlumnosService
  ]
})
export class CoreModule { }
