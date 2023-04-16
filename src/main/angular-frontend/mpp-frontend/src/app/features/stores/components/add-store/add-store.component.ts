import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {AddStoreDTO} from "../overview-stores/Models/store.models";
import {StoreDTO} from "../../../employees/components/overview-employees/Models/employees.models";

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent {
  storeName?: string;
  address?: string;
  contactNumber?: string;
  openingHour?: number;
  closingHour?: number;

  constructor(private service:ApiService, private router:Router){

  }
  goBackToOverview() {
    this.router.navigateByUrl("/stores");
  }

  addStore() {
    console.log(this.storeName)
    if (this.storeName && this.address && this.contactNumber && this.openingHour && this.closingHour){
      const store: AddStoreDTO={
        storeName : this.storeName,
        address: this.address,
        contactNumber: this.contactNumber,
        openingHour: this.openingHour,
        closingHour: this.closingHour
      }
      this.service.addStore(store).subscribe((result:StoreDTO)=>{
        this.router.navigateByUrl("stores");
      },
        (err)=>console.log(err))
    }
  }
}
