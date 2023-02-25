import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressselectComponent } from './addressselect.component';

const routes: Routes = [{ path: '', component: AddressselectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressselectRoutingModule { }
