import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Book} from "./Models/books.models";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-overview-books',
  templateUrl: './overview-books.component.html',
  styleUrls: ['./overview-books.component.css']
})
export class OverviewBooksComponent {
  books: Book[] = []
  displayedColumns = ['id','title', 'author', 'nrPages', 'rating', 'genre']

  rating_gt:number=0;

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) set sort(sorter:MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }
  @ViewChild(MatPaginator) set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }
  constructor(private service: ApiService, private router:Router, private liveAnnouncer : LiveAnnouncer) {
  }
  ngOnInit():void{
    this.service.getBooks().subscribe((books:Book[])=>{
      this.dataSource.data = books;
    })
  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = books;
      }
    )
  }

  goBackToHome(){
    this.router.navigateByUrl("")
  }

  clearFilter(){
    this.service.getBooks().subscribe((books:Book[])=>{
      this.dataSource.data = books;
      this.rating_gt=0;
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }

  }
}
