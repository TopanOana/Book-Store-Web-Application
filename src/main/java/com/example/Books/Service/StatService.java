package com.example.Books.Service;

import com.example.Books.Model.Book;
import com.example.Books.Model.BookStockDTO;
import com.example.Books.Model.Store;
import com.example.Books.Model.StoreStockDTO;
import com.example.Books.Repository.BookRepository;
import com.example.Books.Repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatService {
    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private BookRepository bookRepository;

    public StatService(StoreRepository repo, BookRepository bookRepository) {
        this.storeRepository = repo;
        this.bookRepository = bookRepository;
    }

     public List<StoreStockDTO> getAllStoresByNumberOfBooks(){
        List<StoreStockDTO> toSort = storeRepository.findAll().stream().map(this::convertDataIntoStoreStockDTO).collect(Collectors.toList());
        Collections.sort(toSort);
        return toSort;
    }

    public StoreStockDTO convertDataIntoStoreStockDTO(Store store){
        StoreStockDTO storeStockDTO = new StoreStockDTO();

        storeStockDTO.setStoreID(store.getId());
        storeStockDTO.setStoreName(store.getStoreName());
        storeStockDTO.setAddress(store.getAddress());
        storeStockDTO.setContactNumber(store.getContactNumber());
        storeStockDTO.setOpeningHour(store.getOpeningHour());
        storeStockDTO.setClosingHour(store.getClosingHour());

        storeStockDTO.setQuantity(store.getStocks().stream().map(stock -> {return stock.getQuantity();}).reduce(0, (a,b) -> a+b));

        return storeStockDTO;
    }

    BookStockDTO convertDataIntoBookStockDTO(Book book){
        BookStockDTO bookStockDTO = new BookStockDTO();

        bookStockDTO.setBookID(book.getId());
        bookStockDTO.setTitle(book.getTitle());
        bookStockDTO.setAuthor(book.getAuthor());
        bookStockDTO.setRating(book.getRating());
        bookStockDTO.setNrPages(book.getNrPages());
        bookStockDTO.setGenre(book.getGenre());

        bookStockDTO.setQuantity(book.getStocks().stream().map(stock -> {return stock.getQuantity();}).reduce(0, (a,b) -> a+b));

        return bookStockDTO;
    }

    public List<BookStockDTO> getAllBooksByNumber(){
        List<BookStockDTO> toSort = bookRepository.findAll().stream().map(this::convertDataIntoBookStockDTO).collect(Collectors.toList());
        Collections.sort(toSort);
        return toSort;
    }
}
