import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivecyPolicyComponent } from './privecy-policy.component';

const routes: Routes = [{ path: '', component: PrivecyPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivecyPolicyRoutingModule { }
