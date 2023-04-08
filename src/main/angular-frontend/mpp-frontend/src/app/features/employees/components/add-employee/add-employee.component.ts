import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {AddEmployeeDTO} from "../overview-employees/Models/employees.models";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  salary?: number;
  fullTime?: boolean;
  //store?????? please
  filteredOptions?: any;

  constructor(private service:ApiService, private router:Router){

  }
  goBackToOverview() {
    this.router.navigateByUrl('employees');
  }

  addEmployee() {

    if(this.firstName && this.lastName && this.phoneNumber && this.salary && this.fullTime){
      const employee:AddEmployeeDTO={
        firstName:this.firstName,
        lastName:this.lastName,
        phoneNumber:this.phoneNumber,
        salary:this.salary,
        fullTime:this.fullTime
      }
      //get the id of the store
      //service call
    }

  }

  doTheCompletion() {

  }
}
