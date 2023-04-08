export interface Employee{
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  salary: number;
  fullTime: boolean;
}



export interface AddEmployeeDTO{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  salary: number;
  fullTime: boolean;
}


export interface StoreDTO{
  id:number;
  storeName: string;
  address:string;
  contactNumber: string;
  openingHour: number;
  closingHour: number;

}
