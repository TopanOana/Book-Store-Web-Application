import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Employee, EmployeeTable} from "./Models/employees.models";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-overview-employees',
  templateUrl: './overview-employees.component.html',
  styleUrls: ['./overview-employees.component.css']
})
export class OverviewEmployeesComponent {

  displayedColumns = ['id', 'firstName', 'lastName', 'phoneNumber', 'salary', 'fullTime']

  dataSource = new MatTableDataSource();
  totalEmployees: number =0;

  pageSize=5;

  @ViewChild(MatSort) set sort(sorter:MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }
  @ViewChild(MatPaginator) set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  constructor(private service: ApiService, private router:Router, private liveAnnouncer : LiveAnnouncer) {
  }

  ngOnInit():void{
    this.getEmployeesPaged(0,this.pageSize);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }

  getEmployeesPaged(page:number, size:number){
    this.service.getEmployees(page, size).subscribe((data:EmployeeTable)=>{
      this.dataSource.data = data['content'];
      this.totalEmployees = data['totalElements'];
    })
  }

  goBackToHome() {
    this.router.navigateByUrl("")
  }


  goToAddEmployee() {
    this.router.navigateByUrl(`employees/add`)
  }

  goToEmployeeDetails(employeerow: Employee){
    console.log(employeerow.id)
    let employeeID = employeerow.id
    this.router.navigateByUrl(`employees/${employeeID}`)
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  nextPage(event: PageEvent) {
    var page = event.pageIndex;
    var size = this.pageSize;
    // console.log(size);
    // console.log(page);
    console.log(this.dataSource.paginator);
    this.getEmployeesPaged(page,size);
  }
}
