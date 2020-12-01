import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirlineComponent } from './airline/airline.component';
import { CaComponent } from './ca/ca.component';
import { VerifierComponent } from './verifier/verifier.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AirlineComponent,
    CaComponent,
    VerifierComponent,
    LoginComponent,
  ],
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class ComponentsModule {}
