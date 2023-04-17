import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddBookDTO, Book, BookTable} from "../features/books/components/overview-books/Models/books.models";
import {
  Employee,
  StoreDTO,
  EmployeeTable,
  AddEmployeeDTO, StoreTable, UpdateEmployeeDTO
} from "../features/employees/components/overview-employees/Models/employees.models";
import {AddStoreDTO} from "../features/stores/components/overview-stores/Models/store.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // baseURL='http://16.16.91.165:80';
  baseURL='http://localhost:8080'

  constructor(private http: HttpClient) { }

  getBooks(page:number, size:number, rating_gt?:number): Observable<BookTable>{
    if(rating_gt) {
      return this.http.get(`${this.baseURL}/books?rating_gt=${rating_gt}&page=${page}&size=${size}`) as Observable<BookTable>;
    }
    else
      return this.http.get(`${this.baseURL}/books?page=${page}&size=${size}`) as Observable<BookTable>
  }

  getBookDetails(bookID: number): Observable<Book>{
    return this.http.get(`${this.baseURL}/books/${bookID}`) as Observable<Book>
  }

  updateBook(book:Book, bookID:number): Observable<Book>{
    console.log("update serv")
    return this.http.put(`${this.baseURL}/books/${bookID}`, book) as Observable<Book>
  }

  removeBook(bookID:number): Observable<Book>{
    console.log("remove book service"+bookID)
    return this.http.delete(`${this.baseURL}/books/${bookID}`) as Observable<Book>
  }

  addBook(book: AddBookDTO): Observable<Book>{
    return this.http.post(`${this.baseURL}/books`, book) as Observable<Book>
  }



  getEmployees(page:number, size:number): Observable<EmployeeTable>{
    return this.http.get(`${this.baseURL}/employees?page=${page}&size=${size}`) as Observable<EmployeeTable>
  }

  getEmployeeDetails(employeeID: number): Observable<Employee>{
    return this.http.get(`${this.baseURL}/employees/${employeeID}`) as Observable<Employee>
  }

  updateEmployee(employee: UpdateEmployeeDTO, employeeID: number, storeID: number): Observable<Employee>{
    return this.http.put(`${this.baseURL}/employees/${employeeID}?storeID=${storeID}`, employee) as Observable<Employee>
  }

  removeEmployee(employee:number): Observable<Employee>{

    return this.http.delete(`${this.baseURL}/employees/${employee}`) as Observable<Employee>
  }

  getStores(page:number, size:number, input?:string): Observable<StoreTable>{
    if (input){
      return this.http.get(`${this.baseURL}/stores?input=${input}&page=${page}&size=${size}`) as Observable<StoreTable>
    }
    return this.http.get(`${this.baseURL}/stores?page=${page}&size=${size}`) as Observable<StoreTable>
  }

  addEmployee(employee: AddEmployeeDTO, storeID:number): Observable<Employee>{
    return this.http.post(`${this.baseURL}/employees?storeID=${storeID}`, employee) as Observable<Employee>
  }

  addStore(store: AddStoreDTO): Observable<StoreDTO>{
    return this.http.post(`${this.baseURL}/stores`, store) as Observable<StoreDTO>
  }

  getStoreDetails(storeID:number): Observable<StoreDTO>{
    return this.http.get(`${this.baseURL}/stores/${storeID}`) as Observable<StoreDTO>
  }

  updateStore(storeID:number, store:StoreDTO) : Observable<StoreDTO>{
    return this.http.put(`${this.baseURL}/stores/${storeID}`, store) as Observable<StoreDTO>
  }

  deleteStore(storeID:number): Observable<StoreDTO>{
    return this.http.delete(`${this.baseURL}/stores/${storeID}`) as Observable<StoreDTO>
  }

}
