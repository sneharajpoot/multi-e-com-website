import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/service/api/brand.service';
import { CardService } from 'src/app/service/api/card.service';
import { CategoryService } from 'src/app/service/api/category.service';
import { ProductService } from 'src/app/service/api/product.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  products: any;
  ImgUrl: string;
  cBuyer: any;
  categoryList: any;
  brandList: any;

  constructor(public gbls: GlobalService,
    public product: ProductService,
    public cart: CardService,
    public category: CategoryService,
    public brand: BrandService,
  ) {
    this.ImgUrl = this.gbls.ImgUrl;

    this.getProduct();
    this.getCategory();
    this.getBrand();

    // this.gbls.redirect('/product-details',{productId:});
  }

  ngOnInit(): void {
    this.gbls.LoggedUser.subscribe((data: any) => {
      this.cBuyer = data;
    })
  }
  redirect(p: any) {
    this.gbls.redirect('/product-details', p);
  }
  filter: any = {
    category_id: 0,
    brandId: 0,
    textSearch: ''

  }
  getProductByCategory(categoryId: number) {

    this.filter = {
      category_id: categoryId,
      brandId: 0,
      textSearch: ''
    }
    this.getProduct();
  }
  getProductByText(textSearch: number) {

    this.filter = {
      category_id: 0,
      brandId: 0,
      textSearch: textSearch
    }
    this.getProduct();
  }
  getProduct() {
    let p = {

    }
    this.product.getProductItemWithProductDetail(this.filter).subscribe(data => {
      console.log("<>>>>", data);

      this.products = data.data.data;
    })
  }

  addcart(p: any) {
    console.log(">>>>", p);
    let par = {
      product_id: p.product_id,
      product_item_id: p.product_item_id || '',
      quantity: 1,
      buyer_id: this.cBuyer.id,
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
  getCategory() {
    let par = {}
    this.category.getCategory(par).subscribe(data => {
      this.categoryList = data.data;
    });
  }


  getBrand() {
    let par = {}
    this.brand.getBrand(par).subscribe(data => {
      this.brandList = data.data;
    });
  }

}
