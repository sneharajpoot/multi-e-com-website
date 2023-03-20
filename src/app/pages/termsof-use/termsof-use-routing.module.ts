import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsofUseComponent } from './termsof-use.component';

const routes: Routes = [{ path: '', component: TermsofUseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsofUseRoutingModule { }
