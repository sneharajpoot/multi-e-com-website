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

  constructor(public orders: OrdersService,
    public gbls: GlobalService
  ) {
    this.ImgUrl = this.gbls.ImgUrl;
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

    this.orders.getorder({ buyer_id: this.cBuyer.id }).subscribe(data => {
      this.ordersDetail = data.data;
    })
  }
  cancelcomment:string = '';
  cancelorder(comment:any) {
     
    this.orders.cancelorder({ comment: comment ||''} ).subscribe(data => {
      if (data.result) {
        this.getorder();
        this.gbls.successNotification(data.message);
      } else {
        this.gbls.errorNotification(data.message);
      }
    })

  }
}
