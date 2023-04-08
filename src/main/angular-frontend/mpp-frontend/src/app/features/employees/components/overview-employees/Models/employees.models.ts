import {Book} from "../../../../books/components/overview-books/Models/books.models";

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
  content: EmployeeTable[];
  number:number;
  size:number;
  totalElements:number;
  totalPages:number;

}
