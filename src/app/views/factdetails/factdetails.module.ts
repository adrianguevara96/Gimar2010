// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FactdetailsComponent } from './factdetails.component';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserModule
    ],
    declarations: [
        FactdetailsComponent
    ]
  })
  export class FactdetailsModule { }