import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsofUseRoutingModule } from './termsof-use-routing.module';
import { TermsofUseComponent } from './termsof-use.component';


@NgModule({
  declarations: [
    TermsofUseComponent
  ],
  imports: [
    CommonModule,
    TermsofUseRoutingModule
  ]
})
export class TermsofUseModule { }
