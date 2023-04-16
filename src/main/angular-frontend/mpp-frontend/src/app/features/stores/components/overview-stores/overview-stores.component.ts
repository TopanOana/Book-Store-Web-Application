import {Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {StoreDTO, StoreTable} from "../../../employees/components/overview-employees/Models/employees.models";

@Component({
  selector: 'app-overview-stores',
  templateUrl: './overview-stores.component.html',
  styleUrls: ['./overview-stores.component.css'],
  providers: [MatPaginator, MatSort]
})
export class OverviewStoresComponent {
  displayedColumns = ['id', 'storeName', 'address', 'contactNumber', 'openingHour', 'closingHour']

  dataSource = new MatTableDataSource();
  totalStores: number;

  pageSize=5;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ApiService, private router: Router, private liveAnnouncer: LiveAnnouncer, paginator: MatPaginator, sort : MatSort) {
    this.paginator = paginator;
    this.sort = sort;
    this.totalStores = 0;
  }

  ngOnInit():void{
    // console.log("aiciiii");
  }

  ngAfterViewInit(){
    this.getStoresPaged(this.paginator.pageIndex, this.paginator.pageSize);
  }


  goBackToHome() {
    this.router.navigateByUrl("")
  }

  goToAddStore() {
    this.router.navigateByUrl("stores/add")
  }


  getStoresPaged(page:number, size:number){
    this.service.getStores(page,size).subscribe((data:StoreTable)=>{
      this.dataSource.data = data['content'];
      this.totalStores = data['totalElements'];
    })
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToStoreDetails(storerow: StoreDTO) {
    let storeID = storerow.id;
    this.router.navigateByUrl(`stores/${storeID}`)

  }

  nextPage(event:PageEvent){
    this.getStoresPaged(this.paginator.pageIndex, this.paginator.pageSize);
  }

}
