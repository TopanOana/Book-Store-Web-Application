import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Employee} from "./Models/employees.models";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-overview-employees',
  templateUrl: './overview-employees.component.html',
  styleUrls: ['./overview-employees.component.css']
})
export class OverviewEmployeesComponent {

  displayedColumns = ['id', 'firstName', 'lastName', 'phoneNumber', 'salary', 'fullTime']

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) set sort(sorter:MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }
  @ViewChild(MatPaginator) set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  constructor(private service: ApiService, private router:Router, private liveAnnouncer : LiveAnnouncer) {
  }

  ngOnInit():void{
    this.service.getEmployees().subscribe((employees:Employee[])=>{
      this.dataSource.data = employees;
    })
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.matSort;
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
}
