import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public rest: RestService) { }
  getBrand(p: any) { return this.rest.get('getBrand', p) }
}
