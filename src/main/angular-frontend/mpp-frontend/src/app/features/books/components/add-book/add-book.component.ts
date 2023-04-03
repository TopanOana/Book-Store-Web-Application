import { Component } from '@angular/core';
import {AddBookDTO, Book} from "../overview-books/Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  title?:string
  author?:string
  nrPages?: number;
  rating?: number;
  genre?: string;

  constructor(private service:ApiService, private router:Router){

  }

  addBook() {
    console.log("aici")
    console.log(this.title)
    console.log(this.author)
    console.log(this.nrPages)
    console.log(this.rating)
    console.log(this.genre)
    if(this.title && this.author && this.nrPages && this.rating && this.genre){
      console.log("intrat")
      const book : AddBookDTO ={
        title:this.title,
        author:this.author,
        nrPages:this.nrPages,
        rating:this.rating,
        genre:this.genre
      }
      this.service.addBook(book).subscribe((result: Book)=>
      {
        this.router.navigateByUrl('books');
      },
        (err)=>console.log(err))
    }
  }


  goBackToOverview() {
    this.router.navigateByUrl('books');
  }
}
