import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./common/home/home.component";
import {OverviewBooksComponent} from "./features/books/components/overview-books/overview-books.component";
import {BookDetailsComponent} from "./features/books/components/book-details/book-details.component";
import {AddBookComponent} from "./features/books/components/add-book/add-book.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
