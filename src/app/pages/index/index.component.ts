import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/api/cart.service';
import { ProductService } from 'src/app/service/api/product.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  products: any;
  ImgUrl: string;
  cUser: any;

  constructor(public gbls: GlobalService,
    public product: ProductService,
    public cart: CartService) {
    this.ImgUrl = this.gbls.ImgUrl;

    this.getProduct();

    // this.gbls.redirect('/product-details',{productId:});
  }

  ngOnInit(): void {
    this.gbls.LoggedUser.subscribe((data: any) => {
      this.cUser = data;
    })
  }
  redirect(p: any) {
    this.gbls.redirect('/product-details', p);
  }

  getProduct() {
    let p = {

    }
    this.product.getProductItemWithProductDetail(p).subscribe(data => {
      console.log("<>>>>", data);

      this.products = data.data.data;
    })
  }

  addcart(p: any) {
    console.log(">>>>", p, this.cUser);

    if(!this.cUser) {
      this.gbls.addCartLocalStorage( p);
      return;
    }
    
    let par = {
      product_id: p.product_id,
      product_item_id: p.product_item_id || '',
      quantity: 1,
      buyer_id: this.cUser?.id || 0,
      address_id: 0,
      color: p.color || '',
      size: p.size || '',
    }
    
    this.cart.addcart(par).subscribe(data => {

      this.gbls.loaderStop();
      if (data.result) {
        this.gbls.updateCart();
        this.gbls.successNotification(data.message);
      } else {
        this.gbls.errorNotification(data.message);
      }
    });
  }

}
