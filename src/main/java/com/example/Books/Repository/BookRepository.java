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

//    @PersistenceContext
//    private EntityManager entityManager;

//    @Override
//    Page<BookStockDTO> getBooksSortedByStocksQuantity(Pageable pageable);
//    {
//        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//
//        CriteriaQuery<Tuple> booksQuantityCQ = criteriaBuilder.createQuery(Tuple.class);
//        Root<Stock> stocks = booksQuantityCQ.from(Stock.class);
//
//        booksQuantityCQ.multiselect(
//                stocks.get("book").get("id").alias("book_id"),
//                criteriaBuilder.sum(criteriaBuilder.coalesce(stocks.get("quantity"),0)).alias("quantity")
//        ).groupBy(stocks.get("book").get("id"))
//                .orderBy(criteriaBuilder.desc(criteriaBuilder.sum(criteriaBuilder.coalesce(stocks.get("quantity"),0))));
//
//        TypedQuery<Tuple> typedQuery = entityManager.createQuery(booksQuantityCQ);
//        List<BookStockDTO> results = typedQuery.setFirstResult(pageable.getPageNumber()* pageable.getPageSize())
//                .setMaxResults(pageable.getPageSize())
//                .getResultList()
//                .stream()
//                .map (row ->{
//                    CriteriaQuery<Book> criteriaQuery = criteriaBuilder.createQuery(Book.class);
//                    Root<Book> book = criteriaQuery.from(Book.class);
//                    criteriaQuery.select(book).where(criteriaBuilder.equal(book.get("id"), row.get("book_id")));
//                    Book aux_book = entityManager.createQuery(criteriaQuery).getSingleResult();
//                    return new BookStockDTO(aux_book.getId(), aux_book.getTitle(), aux_book.getAuthor(), aux_book.getNrPages(), aux_book.getRating(), aux_book.getGenre(), (Integer)row.get("quantity") );
//                }).toList();
//        CriteriaQuery<Long> countCQ = criteriaBuilder.createQuery(Long.class);
//        Root<Book> book_count = countCQ.from(Book.class);
//        countCQ.select(criteriaBuilder.countDistinct(book_count.get("id")));
//        long total = entityManager.createQuery(countCQ).getSingleResult();
//
//        return new PageImpl<>(results, pageable, total);
//    }
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



}
