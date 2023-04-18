import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Book, BookTable} from "./Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-overview-books',
  templateUrl: './overview-books.component.html',
  styleUrls: ['./overview-books.component.css'],
  providers: [MatPaginator, MatSort]
})
export class OverviewBooksComponent implements AfterViewInit, OnInit {
  books: Book[] = []
  displayedColumns = ['id', 'title', 'author', 'nrPages', 'rating', 'genre', 'inStores']

  rating_gt: number = 0;
  dataSource = new MatTableDataSource();
  totalBooks: number;
  pageSize = 5;
  column ='';
  order='';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ApiService, private router: Router, private liveAnnouncer: LiveAnnouncer, paginator: MatPaginator, sort : MatSort) {
    this.paginator = paginator;
    this.sort = sort;
    this.totalBooks = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.getBooksPaged(this.paginator.pageIndex, this.paginator.pageSize);
  }

  private getBooksPaged(page: number, size: number) {
    let rating,column,order;
    if (this.rating_gt > 0)
      rating = this.rating_gt;
    if(this.column!='' && this.order!=''){
      column=this.column;
      order=this.order;
    }
    this.service.getBooks(page, size, rating, column, order).subscribe((bookTable: BookTable) => {
      this.dataSource.data = bookTable['content'];
      this.totalBooks = bookTable['totalElements'];
    })
  }

  nextPage(event: PageEvent) {
    this.getBooksPaged(this.paginator.pageIndex, this.paginator.pageSize);
  }

  clearFilter() {
    this.rating_gt = 0;
    this.goToFilterBook();
  }

  goToFilterBook() {
    this.paginator.firstPage();
    this.getBooksPaged(this.paginator.pageIndex, this.paginator.pageSize);
  }

  goToBookDetails(bookrow: Book) {
    let bookID = bookrow.id
    this.router.navigateByUrl(`books/${bookID}`)
  }

  goToAddBook() {
    this.router.navigateByUrl(`books/add`)
  }

  goBackToHome() {
    this.router.navigateByUrl("")
  }

  announceSortChange(sortState: Sort) {
    // console.log("got to sort");
    // console.log(sortState.active)
    // console.log(sortState.direction)
    if (sortState.direction) {
      this.column = sortState.active;
      this.order = sortState.direction;
      this.getBooksPaged(this.paginator.pageIndex,this.paginator.pageSize);
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.column='';
      this.order='';
      this.getBooksPaged(this.paginator.pageIndex,this.paginator.pageSize);
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
