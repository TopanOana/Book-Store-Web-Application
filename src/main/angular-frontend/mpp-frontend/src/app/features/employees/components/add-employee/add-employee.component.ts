import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {AddEmployeeDTO, Employee, StoreDTO, StoreTable} from "../overview-employees/Models/employees.models";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
  // providers: [FormControl]
})
export class AddEmployeeComponent {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  salary?: number;
  fullTime?: boolean;

  filteredStores?: Observable<StoreDTO[]>;

  stores?: StoreDTO[];

  store?: StoreDTO;
  formControl = new FormControl();

  constructor(private service:ApiService, private router:Router){

  }

  ngOnInit(){
    this.filteredStores = this.formControl.valueChanges
      .subscribe(value => {
        if(value.length>=2){
          this.service.getStores(0,5,value).subscribe((response:StoreTable)=>{
            this.stores = response['content'];
            console.log("am ajuns")
          })
        }
      })
  }
  goBackToOverview() {
    this.router.navigateByUrl('employees');
  }

  addEmployee() {

    if(this.firstName && this.lastName && this.phoneNumber && this.salary && this.fullTime ){
      const employee:AddEmployeeDTO={
        firstName:this.firstName,
        lastName:this.lastName,
        phoneNumber:this.phoneNumber,
        salary:this.salary,
        fullTime:this.fullTime
      }
      if (this.store){
          let storeID = this.store.id
          this.service.addEmployee(employee, storeID).subscribe((employee:Employee)=>{
            this.router.navigateByUrl("employees");
          },
            (err)=>console.log(err))
      }

    }

  }

  filter(){
      // this.service.getStores(0,5,this.)
  }
  doTheCompletion() {

  }
}
