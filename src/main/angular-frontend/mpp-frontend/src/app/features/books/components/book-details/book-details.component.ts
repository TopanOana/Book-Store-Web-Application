import { Component } from '@angular/core';
import {Book, BookDetailsDTO} from "../overview-books/Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  bookID?: number;
  book?: Book;

  title?: string;
  author?: string;
  nrPages?: number;
  rating?: number;
  genre?: string;
  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router) {
  }

  ngOnInit():void{
    this.activatedRoute.params.subscribe(params =>{
      this.bookID = params['id']
      console.log(this.bookID)
      this.service.getBookDetails(this.bookID!).subscribe((book: Book)=>{
        this.book = book
        this.title = this.book.title
        this.author = this.book.author
        this.nrPages = this.book.nrPages
        this.rating = this.book.rating
        this.genre = this.book.genre
      })
    })
  }


  updateBook() {
    console.log("update comp")
    console.log(this.book!.title)
    console.log(this.title)
    console.log(this.author)
    console.log(this.nrPages)
    if(this.title && this.author && this.nrPages && this.rating && this.genre){
      this.book!.title = this.title
      this.book!.author = this.author
      this.book!.nrPages = this.nrPages
      this.book!.rating = this.rating
      this.book!.genre = this.genre
      this.service.updateBook(this.book!, this.bookID!).subscribe((result: Book)=>
        {
          console.log("iesit din update")
          this.router.navigateByUrl('books');
        },
        (err)=>console.log(err))
    }
    else{

    }

  }

  deleteBook() {
    console.log(this.bookID)
    this.service.removeBook(this.bookID!).subscribe((result: Book)=>
      {
        console.log("iesit din update")
        this.router.navigateByUrl('books');
      },
      (err)=>console.log(err))
  }
  goBackToOverview(){
    this.router.navigateByUrl("books")
  }
}
