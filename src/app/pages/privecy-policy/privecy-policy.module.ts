import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivecyPolicyRoutingModule } from './privecy-policy-routing.module';
import { PrivecyPolicyComponent } from './privecy-policy.component';


@NgModule({
  declarations: [
    PrivecyPolicyComponent
  ],
  imports: [
    CommonModule,
    PrivecyPolicyRoutingModule
  ]
})
export class PrivecyPolicyModule { }
