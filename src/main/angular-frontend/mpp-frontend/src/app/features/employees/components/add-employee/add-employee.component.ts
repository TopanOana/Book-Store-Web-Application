import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";

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

  constructor(private service:ApiService, private router:Router){

  }
  goBackToOverview() {
    this.router.navigateByUrl('employees');
  }

  addEmployee() {


  }
}
