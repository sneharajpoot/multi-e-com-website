import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressselectRoutingModule } from './addressselect-routing.module';
import { AddressselectComponent } from './addressselect.component';


@NgModule({
  declarations: [
    AddressselectComponent
  ],
  imports: [
    CommonModule,
    AddressselectRoutingModule
  ]
})
export class AddressselectModule { }
