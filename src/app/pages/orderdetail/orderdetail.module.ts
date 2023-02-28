import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderdetailRoutingModule } from './orderdetail-routing.module';
import { OrderdetailComponent } from './orderdetail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderdetailComponent
  ],
  imports: [
    CommonModule,
    OrderdetailRoutingModule,
    FormsModule
  ]
})
export class OrderdetailModule { }
