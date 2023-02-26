import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderdetailRoutingModule } from './orderdetail-routing.module';
import { OrderdetailComponent } from './orderdetail.component';


@NgModule({
  declarations: [
    OrderdetailComponent
  ],
  imports: [
    CommonModule,
    OrderdetailRoutingModule
  ]
})
export class OrderdetailModule { }
