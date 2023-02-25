import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public rest: RestService) {

  }

  getproduct(p: any) { return this.rest.get('getproduct', p); }
  getproductItem(p: any) { return this.rest.get('getproductItem', p); }
  getProductItemWithProductDetail(p: any) { return this.rest.get('getProductItemWithProductDetail', p); }
  productDetailById(p: any) { return this.rest.get('productDetailById', p); }

}
