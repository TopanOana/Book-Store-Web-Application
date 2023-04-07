import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Employee} from "../overview-employees/Models/employees.models";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  employeeID? : number;

  employee?: Employee;
  fullTime?: boolean;

  firstName?: string;
  lastName?: string;
  phoneNumber?: string;

  salary?: number;

  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router) {
  }


  ngOnInit():void{
    this.activatedRoute.params.subscribe(params =>{
      this.employeeID = params['id']
      console.log(this.employeeID)
      this.service.getEmployeeDetails(this.employeeID!).subscribe((employee: Employee)=>{
        this.employee = employee
        this.firstName = employee.firstName
        console.log(this.firstName)
        this.lastName = employee.lastName
        this.phoneNumber = employee.phoneNumber
        this.salary = employee.salary
        this.fullTime = employee.fullTime
      })
    })
  }
  goBackToOverview() {
    this.router.navigateByUrl("employees")
  }

  updateEmployee() {
  if (this.firstName && this.lastName && this.phoneNumber && this.salary && this.fullTime){
    this.employee!.firstName = this.firstName
    this.employee!.lastName = this.lastName
    this.employee!.phoneNumber = this.phoneNumber
    this.employee!.salary = this.salary
    this.employee!.fullTime = this.fullTime
    //todo

  }

  }

  deleteEmployee() {
    console.log(this.employeeID)
    this.service.removeEmployee(this.employeeID!).subscribe((result: Employee)=>
      {
        console.log("iesit din update")
        this.router.navigateByUrl('employees');
      },
      (err)=>console.log(err))
  }
}
