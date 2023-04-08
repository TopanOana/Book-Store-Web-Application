import {Component, ViewChild, ChangeDetectorRef, AfterViewInit, OnInit} from '@angular/core';
import {Book, BookTable} from "./Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorIntl, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-overview-books',
  templateUrl: './overview-books.component.html',
  styleUrls: ['./overview-books.component.css']
})
export class OverviewBooksComponent implements AfterViewInit, OnInit {
  books: Book[] = []
  displayedColumns = ['id','title', 'author', 'nrPages', 'rating', 'genre']

  rating_gt:number=0;

  dataSource = new MatTableDataSource();

  totalBooks: number=0;

  pageSize = 5;

  @ViewChild(MatSort) set sort(sorter:MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }
  // @ViewChild(MatPaginator) set paginator(pager:MatPaginator) {
  //   if (pager) {this.dataSource.paginator = pager;
  //     console.log(this.paginator);
  //   console.log("am ajuns la instantiere");}
  //   // console.log(this.dataSource.paginator);
  //   // console.log(this.paginator);
  // }
  // @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatPaginator) set paginator(pager : MatPaginator){
    // this.paginator = pager;
    this.dataSource.paginator = pager;
  }

  // @ViewChild('paginator') paginator: MatPaginator | null = null;

  // @ViewChild(MatSort) sort  = new MatSort();
  //
  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  constructor(private service: ApiService, private router:Router, private liveAnnouncer : LiveAnnouncer) {

  }
  ngOnInit():void{
    this.getBooksPaged(0,this.pageSize);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.totalBooks=11;
    // this.service.getBooks(this.paginator.pageIndex,this.paginator.pageSize,undefined).subscribe((bookTable:BookTable)=>{
    //   this.dataSource.data = bookTable['content'];
    //   this.totalBooks = bookTable['totalElements'];
    // });
    //
  }

  private getBooksPaged(page:number,size:number){
    var rating;
    if(this.rating_gt>0)
      rating =this.rating_gt;
    this.service.getBooks(page,size, rating).subscribe((bookTable:BookTable)=>{
      // console.log(page['totalElements']);
      this.dataSource.data = bookTable['content'];
      this.totalBooks = bookTable['totalElements'];
    })
    console.log(this.totalBooks);
    console.log(this.dataSource.paginator);
  }

  goToAddBook(){
    this.router.navigateByUrl(`books/add`)
  }

  goToBookDetails(bookrow: Book){
    // console.log(bookrow.id)
    let bookID = bookrow.id
    this.router.navigateByUrl(`books/${bookID}`)
  }

  goToFilterBook(){
    // console.log(this.rating_gt)
    var page = 0;
    var size = this.pageSize;
    // console.log(page);
    // console.log(size);
    this.service.getBooks(page,size, this.rating_gt).subscribe((bookTable :BookTable)=>
      {
        this.dataSource.data = bookTable['content'];
        this.totalBooks = bookTable['totalElements'];
      }
    )
  }

  goBackToHome(){
    this.router.navigateByUrl("")
  }

  clearFilter(){
    this.rating_gt = 0;
    this.getBooksPaged(0,this.pageSize);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  nextPage(event:PageEvent){
    var page = event.pageIndex;
    var size = this.pageSize;
    // console.log(size);
    // console.log(page);
    console.log(this.dataSource.paginator);
    this.getBooksPaged(page,size);

  }



}
