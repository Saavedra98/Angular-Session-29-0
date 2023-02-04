import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DashboardComponent, DialogOverviewProducto  } from './home/home.component';


import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    DashboardComponent,
    DialogOverviewProducto
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ], exports: [
    DashboardComponent,
    DialogOverviewProducto
  ],
})
export class PagesModule { }
