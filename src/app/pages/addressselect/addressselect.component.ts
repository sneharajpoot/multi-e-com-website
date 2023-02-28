import { Component, OnInit } from '@angular/core';
import { BuyerAddressService } from 'src/app/service/api/buyer-address.service';
import { CartService } from 'src/app/service/api/cart.service';
import { OrdersService } from 'src/app/service/api/orders.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-addressselect',
  templateUrl: './addressselect.component.html',
  styleUrls: ['./addressselect.component.scss']
})
export class AddressselectComponent implements OnInit {

  cBuyer: any;
  carts: any;
  ImgUrl: string;
  myAddress: any = [];

  totalAmount: number = 0;
  shippingCharges: number = 0;
  totalDiscount: number = 0;
  netAmount: number = 0;

  cAddress: any = 0;
  paymentType: any = 0;

  constructor(
    public gbls: GlobalService,
    public cart: CartService,
    public buyerAddress: BuyerAddressService,
    public order: OrdersService
  ) {
    this.ImgUrl = this.gbls.ImgUrl
  }

  ngOnInit(): void {
    this.gbls.LoggedUser.subscribe((data: any) => {
      if (data) {
        this.cBuyer = data;
        this.getbuyeraddress();
      }
    })
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
    this.buyerAddress.getbuyeraddress({ buyer_id: this.cBuyer.id }).subscribe(data => {
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
      buyer_id: this.cBuyer.id,
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
      buyer_id: this.cBuyer.id,
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


  placeorder() {
    try {

      console.log("paymentType", this.paymentType)
      console.log("paymentType", this.myAddress[this.cAddress])
      console.log("paymentType", this.paymentType)
      let body = {
        buyer_id: this.cBuyer.id,
        address_id: this.myAddress[this.cAddress]?.id,
      }
      console.log("body", body);
      // return;
      this.gbls.loaderStart();
      this.order.placeorder(body).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          if (data.result) {
            // this.getcart(this.filter.buyer_id)
            this.gbls.redirect('/orderdetail')
            this.gbls.successNotification(data.message);
          } else {
            this.gbls.errorNotification(data.message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }

}
