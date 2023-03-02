import { Component, OnInit } from '@angular/core';
import { BuyerAddressService } from 'src/app/service/api/buyer-address.service';
import { CartService } from 'src/app/service/api/cart.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cUser: any;
  carts: any;
  ImgUrl: string;
  myAddress: any;

  totalAmount: number = 0;
  shippingCharges: number = 0;
  totalDiscount: number = 0;
  netAmount: number = 0;

  constructor(
    public gbls: GlobalService,
    public cart: CartService,
    public buyerAddress: BuyerAddressService,
  ) {
    this.ImgUrl = this.gbls.ImgUrl
  }

  ngOnInit(): void {
    
    this.gbls.LoggedUser.subscribe((data: any) => {
      if (data) {
        this.cUser = data;
        this.getbuyeraddress();
      }
    });

    this.gbls.carts.subscribe((data: any) => {
      if (data) {
        this.carts = data;
        this.carts.forEach((c: any) => {
          this.totalAmount += c.quantity * c.price;
          this.shippingCharges = 0;
          this.totalDiscount += c.quantity * c.discount;
          this.netAmount = this.totalAmount + this.shippingCharges;
        });

      }
    })
  }
  getbuyeraddress() {
    this.buyerAddress.getbuyeraddress({ buyer_id: this.cUser.id }).subscribe(data => {
      console.log("data", data)
      this.myAddress = data.data;
    })
  }
  address: any = {
    name: '',
    address1: '',
    address2: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    active: '',
  }
  addbuyeraddress() {
    let p = {
      buyer_id: this.cUser.id,
      name: this.address.name,
      address1: this.address.address1,
      address2: this.address.address2,
      landmark: this.address.landmark,
      city: this.address.city,
      state: this.address.state,
      country: this.address.country,
      zip: this.address.zip,
      active: this.address.active,
    }
    this.gbls.loaderStart();
    this.buyerAddress.addbuyeraddress(p).subscribe(data => {
      console.log("data", data)

      this.gbls.loaderStop();
      if (data.result) {
        this.getbuyeraddress();
        this.gbls.successNotification(data.message);
      } else {
        this.gbls.errorNotification(data.message);
      }

    })
  }

  updatebuyeraddress(id: number) {
    let p = {
      buyer_id: this.cUser.id,
      name: '',
      address1: '',
      address2: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      active: '',
    }
    this.buyerAddress.updatebuyeraddress(id, p).subscribe(data => {
      console.log("data", data)
    })
  }

  deleteCart(id: number) {
    console.log("deleteCart(id", id)
    if (this.cUser?.id) {

      this.cart.deletecart({ id: id, buyer_id: this.cUser.id }).subscribe(data => {

      })

    } else {

      // for (var i = 0; i < this.carts.length; i++) {
      //   if (this.carts[i].id == id) {
      //     this.carts.splice(i, 1);
      //     break;
      //   }
      // }

      this.gbls.deleteCart(id);

    }
  }

  changequantity(index: number, quantity: number) {

    console.log('....', quantity)

    if (this.cUser?.id) {

      this.cart.updatecart({ id: this.carts[index].id, buyer_id: this.cUser.id, quantity: quantity }).subscribe(data => {

      })

    } else {

      this.carts[index].quantity = Number(quantity || 1);

      this.gbls.addCartLocalStorage(this.carts[index], 'cart');

    }
  }

  redirect(p: any) {
    if (this.cUser?.id) {
      this.gbls.redirect('/addressselect', p);
    } else {
      this.gbls.redirect('/login', p);
    }
  }
}
