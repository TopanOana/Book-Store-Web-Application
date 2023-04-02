import { Component } from '@angular/core';
import {Book} from "./Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview-books',
  templateUrl: './overview-books.component.html',
  styleUrls: ['./overview-books.component.css']
})
export class OverviewBooksComponent {
  books: Book[] = []
  displayedColumns = ['id','title', 'author', 'nrPages', 'rating', 'genre']

  rating_gt:number=0;

  constructor(private service: ApiService, private router:Router) {
  }
  ngOnInit():void{
    this.service.getBooks().subscribe((books:Book[])=>{
      this.books=books;
    })
  }

  goToAddBook(){
    this.router.navigateByUrl(`books/add`)
  }

  goToBookDetails(bookrow: Book){
    console.log(bookrow.id)
    let bookID = bookrow.id
    this.router.navigateByUrl(`books/${bookID}`)
  }

  goToFilterBook(){
    console.log(this.rating_gt)
    this.service.getBooksFilteredByRating(this.rating_gt).subscribe((books:Book[])=>
      {
        this.books =  books;
      }
    )
  }

  goBackToHome(){
    this.router.navigateByUrl("")
  }
}
