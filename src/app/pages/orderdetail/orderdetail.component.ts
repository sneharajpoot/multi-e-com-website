import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/api/orders.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss']
})
export class OrderdetailComponent implements OnInit {
  ordersDetail: any = [];
  ImgUrl: string;
  cBuyer: any;

  pages: any = {
    itemsPerPage: 10,
    currentPage: 1
  }
  // static: { API_ROOT_URL: string; VERIFY_LINK: string; STATUS: string[]; "PAYMENT_SATATUS ": string[]; };
  PAYMENT_STATUS: any;
  STATUS: any;
  changePage(page: number) {
    this.pages.currentPage = page;
    this.getorder();
  }
  constructor(public orders: OrdersService,
    public gbls: GlobalService
  ) {
    this.ImgUrl = this.gbls.ImgUrl;
    this.PAYMENT_STATUS = this.gbls.static.PAYMENT_STATUS
    this.STATUS = this.gbls.static.STATUS;

    console.log("PAYMENT_SATATUS", this.PAYMENT_STATUS);
    console.log("SATATUS", this.STATUS);
  }

  ngOnInit(): void {

    this.gbls.LoggedUser.subscribe((data: any) => {
      if (data) {
        if (data) {
          console.log("this.cBuyer-----", data)
          this.cBuyer = data;
          this.getorder();
        }
      }
    })
  }
  getorder() {

    let p = {
      page: this.pages.currentPage,
      pagesize: this.pages.itemsPerPage,
      buyer_id: this.cBuyer.id
    }
    this.orders.getorder(p).subscribe(data => {
      this.ordersDetail = data.data;
    })
  }
  cancelcomment: string = '';
  cancelorder(comment: any) {

    this.orders.cancelorder({ comment: comment || '' }).subscribe(data => {
      if (data.result) {
        this.getorder();
        this.gbls.successNotification(data.message);
      } else {
        this.gbls.errorNotification(data.message);
      }
    })

  }
}
