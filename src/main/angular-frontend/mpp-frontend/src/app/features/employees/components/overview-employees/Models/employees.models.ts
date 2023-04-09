import {Book} from "../../../../books/components/overview-books/Models/books.models";
import {Observable} from "rxjs";

export interface Employee{
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  salary: number;
  fullTime: boolean;
}


// export interface employeeTable{
//
//
// }


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

export interface EmployeeTable{
  content: Employee[];
  number:number;
  size:number;
  totalElements:number;
  totalPages:number;

}

export interface StoreTable{
  content: StoreDTO[]
  number:number;
  size:number;
  totalElements:number;
  totalPages:number;

}
