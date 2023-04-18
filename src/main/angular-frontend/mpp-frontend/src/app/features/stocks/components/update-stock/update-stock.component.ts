import { Component } from '@angular/core';
import {StockDTO} from "../../../stores/components/overview-stores/Models/store.models";
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent {
  stock?: StockDTO;
  quantity?: number;
  storeID?:number;


  constructor(private service:ApiService, private router:Router, private activatedRoute: ActivatedRoute) {
  }
  goBackToDetails() {
    this.router.navigateByUrl(`stores/`)
  }
}
