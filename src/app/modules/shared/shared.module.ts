import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NombreCompletoPipe } from 'src/app/pipes/nombre-completo.pipe';
import { NombreCompletoUsuarioPipe } from 'src/app/pipes/nombre-completo-usuario.pipe';
import { TituloDirective } from 'src/app/directives/titulo.directive';

@NgModule({
  declarations: [
    NombreCompletoPipe,
    NombreCompletoUsuarioPipe,
    TituloDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    NombreCompletoPipe,
    NombreCompletoUsuarioPipe,
    TituloDirective,
    MatCardModule,
    MatCheckboxModule,
    RouterModule
  ]
})
export class SharedModule { }
