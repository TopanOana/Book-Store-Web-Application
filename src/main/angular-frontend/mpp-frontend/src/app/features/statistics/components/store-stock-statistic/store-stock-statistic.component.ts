import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {StoreStockStat} from "../book-stock-statistic/Model/stat.model";

@Component({
  selector: 'app-store-stock-statistic',
  templateUrl: './store-stock-statistic.component.html',
  styleUrls: ['./store-stock-statistic.component.css'],
  providers: [MatPaginator]
})
export class StoreStockStatisticComponent implements OnInit {
  displayedColumns = ['id', 'storeName', 'address', 'contactNumber', 'openingHour', 'closingHour', 'quantity']

  dataSource = new MatTableDataSource();
  totalStores: number;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ApiService, private router: Router, paginator: MatPaginator) {
    this.paginator = paginator;
    this.totalStores = 0;
  }


  ngOnInit(): void {

    this.service.getStoreStockStat().subscribe((result:StoreStockStat[])=>{
      this.dataSource.data = result;
      this.totalStores = result.length;
    })
  }


  goBackToHome() {
    this.router.navigateByUrl("");
  }
}
