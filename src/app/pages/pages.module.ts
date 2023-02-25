import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../comman/header/header.component';
import { MainComponent } from '../comman/main/main.component';
import { FooterComponent } from '../comman/footer/footer.component';


@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
