package ru.solarlab.study.repository.advertisements;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Advertisement;
import ru.solarlab.study.entities.CategoryEnum;

import java.util.List;

/**
 * Интерфейс для работы с таблицей объявлений в БД
 */
@Repository
public interface AdvertisementRepository extends CrudRepository<Advertisement, Long> {

    @Query(value = "select * from public.advertisement where name ILIKE CONCAT('%', :name, '%')", nativeQuery = true)
    List<Advertisement> findAdvertisementsByNameLike(@Param("name") String name);

    List<Advertisement> findByCategory(CategoryEnum category);

    List<Advertisement> findAdvertisementBySubcategory(String subcategory);

    @Query(value = "select * from public.advertisement where seller_id = :sellerId", nativeQuery = true)
    List<Advertisement> findBySeller(@Param("sellerId") Long sellerId);

    @Override
    List<Advertisement> findAll();

    List<Advertisement> findAdvertisementBySellDateTimeIsNull();

    long countAdvertisementsBySellDateTimeIsNotNull();
}
