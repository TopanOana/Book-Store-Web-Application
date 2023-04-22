package com.example.Books.Service;

import com.example.Books.Exception.BookNotFoundException;
import com.example.Books.Exception.BookValidationException;
import com.example.Books.Model.Book;
import com.example.Books.Repository.BookRepository;
import com.example.Books.Validation.ValidatorBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository repository;


    public BookService(BookRepository repository){
        this.repository=repository;
    }

    public Page<Book> getAllBooks(int page, int size){
        /*
        returns all books in the repo
         */
        PageRequest pageRequest = PageRequest.of(page, size);
        return repository.findAll(pageRequest);
    }


    public Book getBookByID(Long id){
        /*
        gets a specific book from the repo with an id
         */
        return repository.findById(id).orElseThrow(()->new BookNotFoundException(id));
    }

    public Book addBookToRepository(Book newBook) throws BookValidationException {
        /*
        adds a book to the repository
         */
        ValidatorBook validatorBook = new ValidatorBook();
        validatorBook.validate(newBook);
        return repository.save(newBook);
    }


    public Book updateBookInRepository(Long id, Book updatedBook){
        /*
        updating a book or adding a new one with a specific id
        i just used a lot of setters and getters
         */
        ValidatorBook validatorBook = new ValidatorBook();
        validatorBook.validate(updatedBook);
        return repository.findById(id).map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setNrPages(updatedBook.getNrPages());
            book.setRating(updatedBook.getRating());
            book.setGenre(updatedBook.getGenre());
            return repository.save(book);
        }).orElseGet(() -> {
            updatedBook.setId(id);
            return repository.save(updatedBook);
        });
    }


    public void deleteBookInRepository(Long id){
        /*
        deletes a book in the repository
         */
        repository.deleteById(id);
    }

    public Page<Book> getBooksWithRatingGreaterThan(double rating, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        return repository.findBooksByRatingGreaterThan(rating, pageRequest);
    }

    public Page<Book> getBooksSorted(int page, int size, String column, String order){
        PageRequest pageRequest = PageRequest.of(page, size);
        switch (column) {
            case "title" -> {
                if (order.equals("asc"))
                    return repository.findByOrderByTitleAsc(pageRequest);
                else
                    return repository.findByOrderByTitleDesc(pageRequest);
            }
            case "author" -> {
                if (order.equals("asc"))
                    return repository.findByOrderByAuthorAsc(pageRequest);
                else
                    return repository.findByOrderByAuthorDesc(pageRequest);
            }
            case "nrPages" -> {
                if (order.equals("asc"))
                    return repository.findByOrderByNrPagesAsc(pageRequest);
                else
                    return repository.findByOrderByNrPagesDesc(pageRequest);
            }
            case "rating" -> {
                if (order.equals("asc"))
                    return repository.findByOrderByRatingAsc(pageRequest);
                else
                    return repository.findByOrderByRatingDesc(pageRequest);
            }
            default -> {
                return null;
            }
        }
    }


    public Page<Book> getBooksWithTitleInput(String input, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        return repository.findBooksByTitleContainsIgnoreCase(input, pageRequest);
    }


}
