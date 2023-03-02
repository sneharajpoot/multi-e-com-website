import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/api/cart.service';
import { ProductService } from 'src/app/service/api/product.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  products: any;
  ImgUrl: string;
  cUser: any;
  quantity: number = 1;
  cItem: number = 0;
  cImage: any;

  constructor(public gbls: GlobalService,
    public product: ProductService,
    public cart: CartService,
    private route: ActivatedRoute
  ) {
    this.ImgUrl = this.gbls.ImgUrl;


    // this.gbls.redirect('/product-details',{productId:});
  }

  ngOnInit(): void {

    // this.bindFrmSignup();
    // this.config = this.gbls.config;
    this.route.params.subscribe((params: any) => {
      // productId: '1', productItemId: '1'
      console.log("params.cTab", params)
      if (params.productId) {
        this.productDetailById(params.productId)
      } else {
        // this.cTab = 'aUser';
      }
    });

    this.gbls.LoggedUser.subscribe((data: any) => {
      this.cUser = data;
    })
  }
  redirect(p: any) {
    console.log(">>>>", p);
    this.gbls.redirect('/product-details', p);
  }

  productDetailById(productId: number) {
    let p = {
      productId: productId
    }
    this.product.productDetailById(p).subscribe(data => {
      console.log("<data>>>>", data);
      console.log("<data>>>>", data.data);
      console.log("<data>>>>", data.data.data);

      this.products = data.data;
      this.cImage =  this.products?.productItemList[0]?.image1;
    })
  }

  addcart(p: any) {
    console.log(">>>>", p);
    
    p.productItemList[this.cItem].quantity = this.quantity || 1;
    if(!this.cUser) {
      this.gbls.addCartLocalStorage( p.productItemList[this.cItem] );
      return;
    }

    let par = {
      product_id: p.productList[this.cItem].id,
      product_item_id: p.productItemList[this.cItem].id || '',
      quantity: this.quantity,
      buyer_id: this.cUser?.id || 0,
      address_id: this.cItem,
      color: p.productItemList[this.cItem].color || '',
      size: p.productItemList[this.cItem].size || '',
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
