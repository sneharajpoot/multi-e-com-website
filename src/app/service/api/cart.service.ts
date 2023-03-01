import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  constructor(public rest: RestService) { }
  getcart(p: any) { return this.rest.get('getcart', p) }
  addcart(p: any) { return this.rest.post('addcart', p) }
  updatecart(p: any) { return this.rest.post('updatecart', p) }
  deletecart(p: any) { return this.rest.get('deletecart', p) }

}
