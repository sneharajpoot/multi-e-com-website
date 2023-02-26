import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderdetailComponent } from './orderdetail.component';

const routes: Routes = [{ path: '', component: OrderdetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderdetailRoutingModule { }
