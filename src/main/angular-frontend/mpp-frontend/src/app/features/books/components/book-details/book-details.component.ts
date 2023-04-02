import { Component } from '@angular/core';
import {Book, BookDetailsDTO} from "../overview-books/Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  bookID?: number;
  book?: Book;

  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router) {
  }

  ngOnInit():void{
    this.activatedRoute.params.subscribe(params =>{
      this.bookID = params['id']
      console.log(this.bookID)
      this.service.getBookDetails(this.bookID!).subscribe((book: Book)=>{
        this.book = book
      })
    })
  }


  updateBook() {
    console.log("update comp")
    this.service.updateBook(this.book!, this.bookID!).subscribe((result: Book)=>
      {
        this.router.navigateByUrl('books');
      },
      (err)=>console.log(err))

  }

  deleteBook() {
    console.log(this.bookID)
    this.service.removeBook(this.bookID!)
  }
}
