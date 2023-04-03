import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './common/home/home.component';
import { OverviewBooksComponent } from './features/books/components/overview-books/overview-books.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { BookDetailsComponent } from './features/books/components/book-details/book-details.component';
import { AddBookComponent } from './features/books/components/add-book/add-book.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverviewBooksComponent,
    BookDetailsComponent,
    AddBookComponent,
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
        MatSelectModule,
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
