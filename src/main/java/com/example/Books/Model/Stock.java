package com.example.Books.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "STOCK",
indexes = {@Index(columnList = "storeID, quantity"),
@Index(columnList = "bookID, quantity")},
uniqueConstraints = {@UniqueConstraint(columnNames = "bookID, storeID")})
public class Stock {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @ManyToOne/*(fetch = FetchType.LAZY)*/
    @JoinColumn(name="bookID")
    private Book book;

    @ManyToOne/*(fetch = FetchType.LAZY)*/
    @JoinColumn(name="storeID")
    private Store store;

    public void setId(Long id) {
        this.id = id;
    }

    @Column
    @Positive
    private int quantity;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Stock() {
    }

    public Long getId() {
        return id;
    }

    public Stock(Book book, Store store, int quantity) {
        this.book = book;
        this.store = store;
        this.quantity = quantity;
    }
}
