import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(public rest: RestService) {

  }
  getbuyer(p: any) { return this.rest.get('getbuyer', p); }
}
