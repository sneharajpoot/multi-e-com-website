import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressselectRoutingModule } from './addressselect-routing.module';
import { AddressselectComponent } from './addressselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressselectComponent
  ],
  imports: [
    CommonModule,
    AddressselectRoutingModule,

    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddressselectModule { }
