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

  selected : string = 'id';

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

  clearFilter() {
    this.rating_gt=0;
    this.service.getBooks().subscribe((books:Book[])=>{
      this.books=books;
    })
  }

  sortByColumn() {
    console.log(this.selected)
    switch(this.selected){
      case 'id':
        this.books = this.books.sort(function(a,b){
          return a.id-b.id;
        });
        break;
      case 'title':
        console.log('here')
        this.books = this.books.sort(function(a,b){
          if (a.title<b.title)
              return -1;
          else if(a.title>b.title)
            return 1;
          return 0;
        });
        break;
      case 'author':
        this.books.sort(function(a,b){
          if (a.author<b.author)
            return -1;
          else if(a.author>b.author)
            return 1;
          return 0;
        });
        break;
      case 'genre':
        this.books.sort(function(a,b){
          if (a.genre<b.genre)
            return -1;
          else if(a.genre>b.genre)
            return 1;
          return 0;
        });
        break;
      case 'nrPages':
        this.books.sort(function(a,b){
          return a.nrPages-b.nrPages;
        });
        break;
      case 'rating':
        this.books.sort(function(a,b){
          return a.rating-b.rating;
        });
        break;
      default:

    }

  }
}
