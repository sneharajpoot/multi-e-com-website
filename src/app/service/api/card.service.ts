import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  
  constructor(public rest: RestService) { }
  getcart(p: any) { return this.rest.get('getcart', p) }
  addcart(p: any) { return this.rest.post('addcart', p) }
  updatecart(p: any) { return this.rest.post('updatecart', p) }

}
