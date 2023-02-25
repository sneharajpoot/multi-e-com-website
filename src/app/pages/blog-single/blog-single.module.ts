import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogSingleRoutingModule } from './blog-single-routing.module';
import { BlogSingleComponent } from './blog-single.component';


@NgModule({
  declarations: [
    BlogSingleComponent
  ],
  imports: [
    CommonModule,
    BlogSingleRoutingModule
  ]
})
export class BlogSingleModule { }
