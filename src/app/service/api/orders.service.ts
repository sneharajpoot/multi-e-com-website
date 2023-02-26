import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public rest: RestService) { }
  placeorder(p: any) { return this.rest.post('placeorder', p) }
  getorder(p: any) { return this.rest.post('getorder', p) }
  getOrderBuyers(p: any) { return this.rest.post('getOrderBuyers', p) }
  
  

}
