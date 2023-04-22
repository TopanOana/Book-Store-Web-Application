package com.example.Books.Repository;

import com.example.Books.Model.Book;
import com.example.Books.Model.BookStockDTO;
import com.example.Books.Model.Stock;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Tuple;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Long>, JpaSpecificationExecutor<Book> {

    Page<Book> findBooksByRatingGreaterThan(Double rating_gt, Pageable pageable);

    Page<Book> findByOrderByTitleAsc(Pageable pageable);
    Page<Book> findByOrderByTitleDesc(Pageable pageable);

    Page<Book> findByOrderByAuthorAsc(Pageable pageable);
    Page<Book> findByOrderByAuthorDesc(Pageable pageable);

    Page<Book> findByOrderByNrPagesAsc(Pageable pageable);
    Page<Book> findByOrderByNrPagesDesc(Pageable pageable);

    Page<Book> findByOrderByRatingAsc(Pageable pageable);
    Page<Book> findByOrderByRatingDesc(Pageable pageable);

    Page<Book> findBooksByTitleContainsIgnoreCase(String input, Pageable pageable);
    Page<Book> findBooksByTitleStartsWithIgnoreCase(String input, Pageable pageable);



}
