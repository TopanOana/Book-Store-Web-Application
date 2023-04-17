import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './common/home/home.component';
import { OverviewBooksComponent } from './features/books/components/overview-books/overview-books.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import { HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { BookDetailsComponent } from './features/books/components/book-details/book-details.component';
import { AddBookComponent } from './features/books/components/add-book/add-book.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSortModule} from "@angular/material/sort";
import { OverviewEmployeesComponent } from './features/employees/components/overview-employees/overview-employees.component';
import { AddEmployeeComponent } from './features/employees/components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './features/employees/components/employee-details/employee-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import { OverviewStoresComponent } from './features/stores/components/overview-stores/overview-stores.component';
import { StoreDetailsComponent } from './features/stores/components/store-details/store-details.component';
import { AddStoreComponent } from './features/stores/components/add-store/add-store.component';
import { BookStockStatisticComponent } from './features/statistics/book-stock-statistic/book-stock-statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverviewBooksComponent,
    BookDetailsComponent,
    AddBookComponent,
    OverviewEmployeesComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    OverviewStoresComponent,
    StoreDetailsComponent,
    AddStoreComponent,
    BookStockStatisticComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
