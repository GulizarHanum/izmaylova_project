package ru.solarlab.study.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Category;
import ru.solarlab.study.entities.CategoryEnum;

import java.util.Optional;

/**
 * Интерфейс для работы с таблицей подкатегорий в БД
 */
@Repository
public interface CategoryRepository extends CrudRepository<Category, CategoryEnum> {

    @Query(value = "select * from public.category_subcategories where subcategory = :subcategory", nativeQuery = true)
    Optional<Category> findBySubcategory(@Param("subcategory") String subcategory);

}
