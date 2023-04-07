import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./common/home/home.component";
import {OverviewBooksComponent} from "./features/books/components/overview-books/overview-books.component";
import {BookDetailsComponent} from "./features/books/components/book-details/book-details.component";
import {AddBookComponent} from "./features/books/components/add-book/add-book.component";
import {
  OverviewEmployeesComponent
} from "./features/employees/components/overview-employees/overview-employees.component";
import {AddEmployeeComponent} from "./features/employees/components/add-employee/add-employee.component";
import {EmployeeDetailsComponent} from "./features/employees/components/employee-details/employee-details.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "books",
    component: OverviewBooksComponent
  },
  {
    path: "books/add",
    component: AddBookComponent
  },
  {
    path: "books/:id",
    component: BookDetailsComponent
  },
  {
    path:"employees",
    component: OverviewEmployeesComponent
  },
  {
    path: "employees/add",
    component: AddEmployeeComponent
  },
  {
    path: "employees/:id",
    component: EmployeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
