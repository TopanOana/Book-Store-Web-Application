import {Component, ViewChild} from '@angular/core';
import {Book} from "./Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

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


  constructor(private service: ApiService, private router:Router, private liveAnnouncer : LiveAnnouncer) {
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

  /** Announce the change in sort state for assistive technology. */
  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

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
        console.log(this.books[1].genre)
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
