import { Component } from '@angular/core';
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreDTO} from "../../../employees/components/overview-employees/Models/employees.models";

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent {

  storeName?: string;
  address?: string;
  contactNumber?: string;
  openingHour?: number;
  closingHour?: number;
  store?:StoreDTO;
  storeID?:number;
  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router) {
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
      })
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
}
