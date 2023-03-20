import { Component, OnInit } from '@angular/core';
import { BuyerAddressService } from 'src/app/service/api/buyer-address.service';
import { CartService } from 'src/app/service/api/cart.service';
import { OrdersService } from 'src/app/service/api/orders.service';
import { GlobalService } from 'src/app/service/global.service';
import { WindowRefService } from 'src/app/service/window-ref.service';

// import { RazorpayService } from 'razorpay';
// import { RazorpayService } from 'razorpay';
// const Razorpay = require('razorpay')

// import { Razorpay } from 'razorpay'; 
// const Razorpay = require('razorpay');


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
    public order: OrdersService,
    private winRef: WindowRefService,
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

  payment(orderID: number) {
    let pp = {
      amount: this.netAmount,
      notes: 'from web ',
      currency: 'INR',
      receipt: 'order_' + orderID,
      orderID: orderID
    }
    this.gbls.payment(pp).subscribe(data => {
      console.log(">>>", data.order.id);
      this.createRzpayOrder(data);
    })
  }

  createRzpayOrder(data: any) {
    console.log(data);
    // call api to create order_id
    // this.payWithRazor(order_id);
    this.payWithRazor(data.order.id);
  }


  payWithRazor(val: any) {
    const options: any = {
      key: 'rzp_test_xyBvixSyDydvDx',
      amount: this.netAmount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;

      this.gbls.redirect('/orderdetail')
      console.log('error--------->', error);
      console.log('response--------->', response);
      console.log('options--------->', options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = ((data: any) => {
      console.log('---------->', data);
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }


  getbuyeraddress() {
    this.buyerAddress.getbuyeraddress({ buyer_id: this.cBuyer.id }).subscribe((data: any) => {
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

      // console.log("paymentType", this.paymentType)
      // console.log("paymentType", this.myAddress[this.cAddress])
      // console.log("paymentType", this.paymentType)
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
            // Mack Payment
            if (this.paymentType == 0) {
              this.payment(data.response.orderID);
            } else {
              this.gbls.redirect('/orderdetail')
              this.gbls.successNotification(data.message);
            }
          } else {
            this.gbls.errorNotification(data.message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          console.log("error", error.message || error);
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }

}
