package com.example.Books.Service;

import com.example.Books.Exception.StockNotFoundException;
import com.example.Books.Exception.StockValidationException;
import com.example.Books.Model.Stock;
import com.example.Books.Repository.StockRepository;
import com.example.Books.Validation.ValidatorStock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public StockService(StockRepository stockRepository){
        this.stockRepository=stockRepository;
    }

    public List<Stock> getAllStocks(){
        return stockRepository.findAll();
    }

    public Stock getStockByID(Long id){
       return stockRepository.findById(id).orElseThrow(() -> new StockNotFoundException(id));
    }

    public Stock addStockToRepository(Stock newStock){
        ValidatorStock validatorStock = new ValidatorStock(stockRepository);
        validatorStock.validate(newStock);
        return stockRepository.save(newStock);
    }

    public Stock updateStockInRepository(Long id, Stock updatedStock){
        if(updatedStock.getQuantity()<1 || updatedStock.getQuantity()>1000)
            throw new StockValidationException("stock quantity invalid (quantity<1 || quantity>1000");
        return stockRepository.findById(id).map(stock->{
            stock.setBook(updatedStock.getBook());
            stock.setStore(updatedStock.getStore());
            stock.setQuantity(updatedStock.getQuantity());
            return stockRepository.save(stock);
        }).orElseGet(() -> {
            updatedStock.setId(id);
            return stockRepository.save(updatedStock);
        });
    }

    public void deleteStockInRepository(Long id){
        stockRepository.deleteById(id);
    }

    public Page<Stock> getStockWithBookID(Long bookID, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        //return stockRepository.findAll().stream().filter(obj -> Objects.equals(obj.getBook().getId(), bookID)).collect(Collectors.toList());
        return stockRepository.getStocksByBookId(bookID,pageRequest);
    }

    public Page<Stock> getStockWithStoreID(Long storeID, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
//        System.out.println("got to stock service");
//        return stockRepository.findAll().stream().filter(obj -> Objects.equals(obj.getStore().getId(), storeID)).collect(Collectors.toList());
        return stockRepository.getStocksByStoreId(storeID,pageRequest);
    }


}
