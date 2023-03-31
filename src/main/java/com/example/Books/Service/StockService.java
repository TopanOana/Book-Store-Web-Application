package com.example.Books.Service;

import com.example.Books.Exception.StockNotFoundException;
import com.example.Books.Model.Stock;
import com.example.Books.Repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return stockRepository.save(newStock);
    }

    public Stock updateStockInRepository(Long id, Stock updatedStock){
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

    public List<Stock> getStockWithBookID(Long bookID){
        return stockRepository.findAll().stream().filter(obj -> Objects.equals(obj.getBook().getId(), bookID)).collect(Collectors.toList());
    }

    public List<Stock> getStockWithStoreID(Long storeID){
        return stockRepository.findAll().stream().filter(obj -> Objects.equals(obj.getStore().getId(), storeID)).collect(Collectors.toList());
    }


}
