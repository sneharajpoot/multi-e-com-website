import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  detail: any;

  constructor(private gbls: GlobalService) {
    this.detail = this.gbls.detail;

  }

  ngOnInit(): void {
  }

}
