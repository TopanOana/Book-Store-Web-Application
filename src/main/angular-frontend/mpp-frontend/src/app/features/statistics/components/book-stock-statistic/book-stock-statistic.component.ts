import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../../../common/api.service";
import {Router} from "@angular/router";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort} from "@angular/material/sort";
import {BookStockStat, BookStockTable} from "./Model/stat.model";

@Component({
  selector: 'app-book-stock-statistic',
  templateUrl: './book-stock-statistic.component.html',
  styleUrls: ['./book-stock-statistic.component.css'],
  providers: [MatPaginator]
})
export class BookStockStatisticComponent implements OnInit{
  displayedColumns = ['id', 'title', 'author', 'nrPages', 'rating', 'genre', 'quantity']
  dataSource= new MatTableDataSource();

  totalBooks: number;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ApiService, private router: Router, paginator: MatPaginator) {
    this.paginator = paginator;
    this.totalBooks = 0;
  }

  getAllBooks(page:number, size:number){
    this.service.getBookStockStat(page, size).subscribe((result:BookStockTable)=>{
      this.dataSource.data = result['content'];
      this.totalBooks = result['totalElements'];
    })
  }
  ngOnInit(): void {
   this.getAllBooks(this.paginator.pageIndex, this.paginator.pageSize)
  }


  goBackToHome() {
    this.router.navigateByUrl("");
  }

  nextPage($event: PageEvent) {
    this.getAllBooks(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
