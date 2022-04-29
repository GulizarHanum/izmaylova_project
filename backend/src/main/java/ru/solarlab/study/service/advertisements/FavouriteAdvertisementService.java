package ru.solarlab.study.service.advertisements;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.AdvertisementDto;
import ru.solarlab.study.dto.FavouriteAdvertisementDto;
import ru.solarlab.study.entities.Advertisement;
import ru.solarlab.study.entities.Profile;
import ru.solarlab.study.repository.advertisements.FavouriteAdvertisementRepository;
import ru.solarlab.study.service.ProfileService;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Логика для работы с избранными объявлениями
 */
@Service
@AllArgsConstructor
@Transactional
public class FavouriteAdvertisementService {

    private final FavouriteAdvertisementRepository repository;
    private final AdvertisementService advertisementService;
    private final ProfileService profileService;


    /**
     * Получить все избранные объявления у профиля
     *
     * @return список избранных объявлений у профиля
     */
    public List<AdvertisementDto> getFavouriteAdvertisementsByProfileId(Long profileId) {
        List<Long> favAdvertisementsIds = repository.findFavouriteAdvertisementsByProfile(profileId);

        return advertisementService.getAdvertisementsByIds(favAdvertisementsIds);
    }

    /**
     * Добавить объявление в Избранное профилю
     *
     * @param dto данные
     */
    public void addToFavourites(FavouriteAdvertisementDto dto) {
        Profile profile = profileService.getProfileById(dto.getProfileId());
        Advertisement favourite = advertisementService.getAdvertisementById(dto.getAdvertisementId());

        profile.getFavouriteAdvertisements().add(favourite);
        profileService.saveProfile(profile);
    }

    /**
     * Убрать объявление из Избранного у профиля
     *
     * @param dto данные
     */
    public void removeFromFavourites(FavouriteAdvertisementDto dto) {
        repository.removeAdvertisementByProfileId(dto.getProfileId(), dto.getAdvertisementId());
    }


}
