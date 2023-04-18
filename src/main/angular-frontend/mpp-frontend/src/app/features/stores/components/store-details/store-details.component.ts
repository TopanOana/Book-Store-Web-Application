import {Component, ViewChild} from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreDTO} from "../../../employees/components/overview-employees/Models/employees.models";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {StockDTO} from "../overview-stores/Models/store.models";

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css'],
  providers: [MatPaginator]
})
export class StoreDetailsComponent {

  storeName?: string;
  address?: string;
  contactNumber?: string;
  openingHour?: number;
  closingHour?: number;
  store?:StoreDTO;
  storeID?:number;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'title', 'quantity', 'buttons'];

  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router, paginator:MatPaginator) {
    this.paginator=paginator;
  }
  goBackToOverview() {
    this.router.navigateByUrl("/stores");
  }

  ngOnInit() : void{
    this.activatedRoute.params.subscribe(params=>{
      this.storeID = params['id']
      this.service.getStoreDetails(this.storeID!).subscribe((store:StoreDTO)=>{
        this.store=store;
        this.storeName=store.storeName;
        this.address=store.address;
        this.contactNumber=store.contactNumber;
        this.openingHour=store.openingHour;
        this.closingHour= store.closingHour;
      });
      this.service.getStocksFromStore(this.storeID!).subscribe((stocks:StockDTO[])=>{
        this.dataSource.data=stocks;
        console.log(stocks[0].book.title);
      });
    })

  }
  updateStore() {
    if (this.storeName && this.address && this.contactNumber && this.openingHour && this.closingHour){
      this.store!.storeName = this.storeName;
      this.store!.address = this.address;
      this.store!.contactNumber = this.contactNumber;
      this.store!.openingHour = this.openingHour;
      this.store!.closingHour = this.closingHour;
      this.service.updateStore(this.storeID!, this.store!).subscribe((result:StoreDTO)=>{
        this.router.navigateByUrl("stores");
      },
        (err)=>console.log(err))
    }
    else{

    }
  }

  deleteStore() {
    this.service.deleteStore(this.storeID!).subscribe((result:StoreDTO)=>{
      this.router.navigateByUrl("stores");
    }, (err)=>console.log(err))
  }

  goToAddStock() {

  }

  updateStock(id:number) {

  }

  deleteStock(id:number) {

  }

}
