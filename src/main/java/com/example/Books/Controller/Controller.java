package com.example.Books.Controller;

//import com.example.Books.Exception.BookNotFoundException;
import com.example.Books.Model.*;
//import com.example.Books.Repository.BookRepository;
import com.example.Books.Service.*;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class Controller {

//    @Autowired
    @Autowired private final BookService bookService;

    @Autowired private final StoreService storeService;

    @Autowired private final EmployeeService employeeService;
    @Autowired private final StockService stockService;

    @Autowired private final StatService statService;


    public Controller(StoreService storeService, BookService bookService, EmployeeService employeeService, StockService stockService, StatService statService) {
        this.bookService = bookService;
        this.storeService = storeService;
        this.employeeService = employeeService;
        this.stockService = stockService;
        this.statService = statService;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/books")
    Page<Book> getBooks(@Nullable @RequestParam("rating_gt") Double rating, @RequestParam int page, @RequestParam int size, @Nullable @RequestParam String column, @Nullable @RequestParam String order, @Nullable @RequestParam String input){
        /*
        the get mapping is for reading all the books in the repository or
        getting all the books in the repository with a rating greater than the one given
         */

        if(rating!=null)
            return bookService.getBooksWithRatingGreaterThan(rating,page,size);
        if(column!=null && order!=null)
            return bookService.getBooksSorted(page, size, column, order);
        if(input!=null)
            return bookService.getBooksWithTitleInput(input, page, size);
        return bookService.getAllBooks(page, size);
    }
    // end::get-aggregate-root[]


    @GetMapping("/books/{id}")
    Book getBookByID(@PathVariable Long id){
        /*
        the get mapping that returns a book with a specific id in the repository
         */
        return bookService.getBookByID(id);
    }

    @PostMapping("/books")
    Book addBook(@RequestBody @Valid Book newBook){
        /*
        the post mapping is for adding a new book to the repository
         */
        return bookService.addBookToRepository(newBook);
    }

    @PutMapping("/books/{id}")
    Book updateBook(@RequestBody @Valid Book updatedBook, @PathVariable Long id){
        /*
        the put mapping is for updating a book or adding a new one with a specific id
        i just used a lot of setters and getters
         */
        return bookService.updateBookInRepository(id,updatedBook);
    }

    @DeleteMapping("/books/{id}")
    void deleteBook(@PathVariable Long id){
        /*
        the delete mapping is for removing a book from the repository
         */
        System.out.println("plang");
        bookService.deleteBookInRepository(id);
    }



    @GetMapping("/stores")
    Page<Store> getAllStores(@Nullable @RequestParam String input, @RequestParam int page, @RequestParam int size, @Nullable @RequestParam String column, @Nullable @RequestParam String order){
        /*
        get mapping for reading all the stores in the repository
         */
        if(input!=null)
            return storeService.getStoresWithNameLike(input, page, size);
        if(column!=null && order!=null) {
            System.out.println("got to the sort");
            return storeService.getStoresSorted(page, size, column, order);
        }
        return storeService.getAllStores(page, size);

    }
//    @GetMapping("/stores/{id}")
//    List<Employee> getStoreEmployeesByID(@PathVariable Long id){
//        /*
//        gets a store with a specific id
//         */
//        return storeService.getStoreEmployeesByID(id);
//    }
    @GetMapping("/stores/{id}")
    Store getStoreByID(@PathVariable Long id){
        return storeService.getStoreByID(id);
    }



    @PostMapping("/stores")
    Store addStore(@RequestBody @Valid Store newStore){
        /*
        post mapping for adding a new store to the repository
         */
        return storeService.addStoreToRepository(newStore);
    }



    @PutMapping("/stores/{id}")
    Store updateStore(@RequestBody @Valid Store updatedStore, @PathVariable Long id){
        /*
        put mapping for updating a store or adding a new store with a specific id
         */
        if (updatedStore!=null)
            return storeService.updateStoreInRepository(id,updatedStore);
        return null;
    }


    @DeleteMapping("/stores/{id}")
    void deleteStore(@PathVariable Long id){
        /*
        delete mapping for removing a store from the repository
         */
        storeService.deleteStoreByID(id);
    }


    @GetMapping("/employees")
    Page<Employee> getAllEmployees(@RequestParam int page, @RequestParam int size, @Nullable @RequestParam String column, @Nullable @RequestParam String order){
        if (column!=null && order!=null)
            return employeeService.getSortedBy(page, size, column, order);
        else
            return employeeService.getAllEmployees(page, size);

    }

    @GetMapping("/employees/{id}")
    Employee getEmployeeStore(@PathVariable Long id){
        return employeeService.getStoreIDByEmployeeID(id);
    }


    @PostMapping("/employees")
    Employee addEmployee(@RequestBody @Valid Employee employee, @RequestParam("storeID") Long storeID){
        employee.setStore(storeService.getStoreByID(storeID));
        return employeeService.addEmployeeToRepository(employee);
    }

    @PostMapping("/stores/{id}/employees")
    List<Employee> addMultipleEmployees(@RequestBody List<Employee> employees, @PathVariable Long id){
        Store store = storeService.getStoreByID(id);
        for(Employee e: employees) {
            e.setStore(store);
            employeeService.addEmployeeToRepository(e);
        }
        return employees;
    }

    @PutMapping("/employees/{id}")
    Employee updateEmployee(@RequestBody @Valid Employee newEmployee, @RequestParam("storeID") Long storeID, @PathVariable Long id){
        newEmployee.setStore(storeService.getStoreByID(storeID));
        return employeeService.updateEmployeeInRepository(id, newEmployee);
    }

    @DeleteMapping("/employees/{employeeId}")
    void deleteEmployee(@PathVariable Long employeeId){
        employeeService.deleteEmployeeInRepository(employeeId);
    }


    @GetMapping("/stocks")
    List<Stock> getAllStocks(){
        return stockService.getAllStocks();
    }

    @PostMapping("/stores/{id}/stock")
    Stock addStock(@PathVariable Long id, @RequestBody @Valid Stock stock){
        stock.setStore(storeService.getStoreByID(id));
        return this.stockService.addStockToRepository(stock);
    }

    @GetMapping("/stores/{id}/stock")
    List<Stock> getStocksFromStore (@PathVariable Long id){
        return storeService.getStoreByID(id).getStocks();
    }

    @GetMapping("/books/{id}/stock")
    List<Stock> getStocksForBooks(@PathVariable Long id){
        return bookService.getBookByID(id).getStocks();
    }

    @DeleteMapping("/stores/{id}/stock")
    void deleteStockFromStore(@PathVariable Long id, @RequestParam("stockID") Long stockID){
        this.stockService.deleteStockInRepository(stockID);
    }

    @PutMapping("/stores/{id}/stock")
    Stock updateStockInStore(@PathVariable Long id, @RequestBody @Valid Stock stock){
        Long stockID = storeService.getStoreByID(id).getStocks().stream().filter(stock1 -> {return stock.getBook().equals(stock.getBook());}).map(stock1 -> {return stock1.getId();}).findFirst().get();
        stock.setStore(storeService.getStoreByID(id));
        return this.stockService.updateStockInRepository(stockID, stock);
    }

    @GetMapping("/stats/stores")
    List<StoreStockDTO> getStatStoreStock(){
        return statService.getAllStoresByNumberOfBooks();
    }

    @GetMapping("/stats/books")
    List<BookStockDTO> getStatBookStock(){
        return statService.getAllBooksByNumber();
    }


    @GetMapping("/stocks/{id}")
    Stock getStock(@PathVariable Long id){
        return stockService.getStockByID(id);
    }




}

