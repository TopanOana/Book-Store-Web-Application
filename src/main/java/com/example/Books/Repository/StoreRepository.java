package com.example.Books.Repository;

import com.example.Books.Model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store,Long> {
    List<Store> findStoresByStoreNameContainsIgnoreCase(String input);
}
