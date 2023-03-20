import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundPolicyRoutingModule } from './refund-policy-routing.module';
import { RefundPolicyComponent } from './refund-policy.component';


@NgModule({
  declarations: [
    RefundPolicyComponent
  ],
  imports: [
    CommonModule,
    RefundPolicyRoutingModule
  ]
})
export class RefundPolicyModule { }
