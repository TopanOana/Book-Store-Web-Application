import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddBookDTO, Book, BookTable} from "../features/books/components/overview-books/Models/books.models";
import {Employee, StoreDTO} from "../features/employees/components/overview-employees/Models/employees.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL='http://localhost:8080';
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

  getBooksFilteredByRating(rating_gt:number, page:number, size:number):Observable<any>{
    return this.http.get(`${this.baseURL}/books?rating_gt=${rating_gt}&page=${page}&size=${size}`)
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get(`${this.baseURL}/employees`) as Observable<Employee[]>
  }

  getEmployeeDetails(employeeID: number): Observable<Employee>{
    return this.http.get(`${this.baseURL}/employees/${employeeID}`) as Observable<Employee>
  }

  // updateEmployee(employee:Employee, employeeID:number): Observable<Employee>{
  //   return this.http.put(`${this.baseURL}/employees/``)
  // }

  removeEmployee(employee:number): Observable<Employee>{

    return this.http.delete(`${this.baseURL}/employees/${employee}`) as Observable<Employee>
  }

  getStores(): Observable<StoreDTO>{
    return this.http.get(`${this.baseURL}/stores`) as Observable<StoreDTO>
  }
}
