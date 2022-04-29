package ru.solarlab.study.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Dialog;

import java.util.List;

/**
 * Интерфейс для работы с таблицей диалогов в БД
 */
@Repository
public interface DialogRepository extends CrudRepository<Dialog, Long> {

    List<Dialog> findByAdvertisementId(Long advertisementId);

    @Query(value = "select * from dialog where adverisement_id in (SELECT id from advertisement where seller_id = :sellerId)", nativeQuery = true)
    List<Dialog> findBySellerAdvertisements(@Param("sellerId") Long sellerId);
}
