package ru.solarlab.study.repository.advertisements;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Advertisement;

import java.util.List;

/**
 * Интерфейс для работы с таблицей избранных объявлений в БД
 */
@Repository
public interface FavouriteAdvertisementRepository extends CrudRepository<Advertisement, Long> {

    @Query(value = "select advertisement_id from public.profile_favourites where profile_id = :profileId", nativeQuery = true)
    List<Long> findFavouriteAdvertisementsByProfile(@Param("profileId") Long profileId);

    @Modifying
    @Query(value = "delete from public.profile_favourites where profile_id = :profileId and advertisement_id = :advertisementId", nativeQuery = true)
    void removeAdvertisementByProfileId(@Param("profileId") Long profileId, @Param("advertisementId") Long advertisementId);
}
