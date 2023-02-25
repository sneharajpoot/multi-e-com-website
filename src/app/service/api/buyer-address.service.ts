import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerAddressService {

  constructor(public rest: RestService) { }
  getbuyeraddress(p: any) { return this.rest.get('getbuyeraddress', p) }
  addbuyeraddress(p: any) { return this.rest.post('addbuyeraddress', p) }
  updatebuyeraddress(id:number, p: any) { return this.rest.post('updatebuyeraddress/'+id, p) }
  
}
