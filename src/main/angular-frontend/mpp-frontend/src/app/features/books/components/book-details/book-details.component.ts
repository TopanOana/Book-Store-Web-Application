import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../overview-books/Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {StockTable} from "../../../stores/components/overview-stores/Models/store.models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [MatPaginator, MatSnackBar]
})
export class BookDetailsComponent implements OnInit, AfterViewInit{
  bookID?: number;
  book?: Book;

  title?: string;
  author?: string;
  nrPages?: number;
  rating?: number;
  genre?: string;

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'storeName', 'quantity'];
  pageSize: number;
  totalStocks: number;
  constructor(private service:ApiService, private activatedRoute: ActivatedRoute, private router:Router, paginator:MatPaginator, private snackBar:MatSnackBar) {
    this.paginator = paginator;
    this.pageSize = 0;
    this.totalStocks =0;
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

  ngAfterViewInit() {
    this.getStocksPaged(this.paginator.pageIndex, this.paginator.pageSize)

  }

  getStocksPaged(page:number, size:number){
    this.service.getStocksFromBook(this.bookID!,page,size).subscribe((result:StockTable)=>{
      this.dataSource.data = result['content']
      this.totalStocks = result['totalElements']
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
        (err)=>{
        console.log(err)
          this.snackBar.open(err['error']['message'],'close',{
            horizontalPosition:"center",
            verticalPosition:"top"
          })
        }
      )
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

  nextPage($event: PageEvent) {
    this.getStocksPaged(this.paginator.pageIndex, this.paginator.pageSize)
  }
}
