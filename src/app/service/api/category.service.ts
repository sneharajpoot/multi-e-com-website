import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public rest: RestService) { }

  getCategory(p: any) { return this.rest.get('getCategory', p); }

}
