import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {StoreStockStat, StoreStockTable} from "../book-stock-statistic/Model/stat.model";

@Component({
  selector: 'app-store-stock-statistic',
  templateUrl: './store-stock-statistic.component.html',
  styleUrls: ['./store-stock-statistic.component.css'],
  providers: [MatPaginator]
})
export class StoreStockStatisticComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'storeName', 'address', 'contactNumber', 'openingHour', 'closingHour', 'quantity']

  dataSource = new MatTableDataSource();
  totalStores: number;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ApiService, private router: Router, paginator: MatPaginator) {
    this.paginator = paginator;
    this.totalStores = 0;
  }

  getAllStores(page:number, size:number){
    this.service.getStoreStockStat(page, size).subscribe((result:StoreStockTable)=>{
      this.dataSource.data = result['content']
      this.totalStores = result.totalElements;
    })
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.getAllStores(this.paginator.pageIndex, this.paginator.pageSize);
  }






  goBackToHome() {
    this.router.navigateByUrl("");
  }

  nextPage($event: PageEvent) {
    this.getAllStores(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
