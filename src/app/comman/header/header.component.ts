import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cUser: any;
  carts: any;
  detail: any;

  constructor(public gbls: GlobalService) { }

  ngOnInit(): void {
    this.detail = this.gbls.detail;
    this.gbls.LoggedUser.subscribe((data: any) => {
      if (data) {
        this.cUser = data;
      }
    });

    
    this.gbls.carts.subscribe((data: any) => {
      this.carts = data;
    });

  }

  
  redirectFilter(p: any) {
    this.gbls.redirect('/filter', p);
  }

  
}
