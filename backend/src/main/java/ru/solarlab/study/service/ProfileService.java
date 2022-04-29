package ru.solarlab.study.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.ProfileDto;
import ru.solarlab.study.entities.City;
import ru.solarlab.study.entities.Profile;
import ru.solarlab.study.entities.User;
import ru.solarlab.study.repository.ProfileRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Логика для работы с профилем
 */
@Service
@AllArgsConstructor
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserService userService;

    /**
     * Создание профиля
     *
     * @param dto объект с данными
     */
    public void createProfile(ProfileDto dto) {
        User user = userService.findUserById(dto.getUserId());

        Profile profile = new Profile();
        profile.setLastName(dto.getLastName());
        profile.setFirstName(dto.getFirstName());
        profile.setMiddleName(dto.getMiddleName());
        profile.setPhoto(UtilsService.convertPhotoToByte(dto.getPhoto()));
        profile.setRating(BigDecimal.ZERO);
        profile.setCity(City.fromValue(dto.getCity()));
        profile.setCreationDateTime(LocalDateTime.now());
        profile.setUser(user);

        profileRepository.save(profile);
    }

    /**
     * Получение профиля по айди
     *
     * @param id айди нужного нам профиля
     *
     * @return возвращаем найденный профиль
     */

    public ProfileDto getProfileDtoById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор профиля");
        }
        return profileRepository.findById(id)
                .map(ProfileService::buildDto)
                .orElse(null);
    }

    /**
     * Возвращает сущность Профиль
     *
     * @param id айди профиля
     *
     * @return сущность Профиль
     */
    public Profile getProfileById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор профиля");
        }
        return profileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Профиль с id = %s не найден", id)));
    }

    /**
     * Удалить профиль по его идентификатору
     *
     * @param profileId айди записи
     */
    public void deleteProfile(Long profileId) {
        if (profileId == null) {
            throw new IllegalArgumentException("Неверный идентификатор профиля");
        }

        profileRepository.deleteById(profileId);
    }

    /**
     * Сохранить профиль
     *
     * @param profile сущность Профиль
     */
    public void saveProfile(Profile profile) {
        if (profile == null) {
            throw new IllegalArgumentException("Передан пустой профиль");
        }

        profileRepository.save(profile);
    }

    /**
     * Редактировать профиль
     *
     * @param newProfile профиль
     *
     * @return измененный профиль
     */
    public ProfileDto editProfile(ProfileDto newProfile) {
        Profile profileRecord = getProfileById(newProfile.getId());

        profileRecord.setLastName(newProfile.getLastName());
        profileRecord.setFirstName(newProfile.getFirstName());
        profileRecord.setMiddleName(newProfile.getMiddleName());
        profileRecord.setCity(City.fromValue(newProfile.getCity()));
        profileRecord.setPhoto(UtilsService.convertPhotoToByte(newProfile.getPhoto()));

        return buildDto(profileRepository.save(profileRecord));
    }

    /**
     * Обновить среднее значение оценки профиля
     *
     * @param profileId  айди профиля
     * @param newAvgMark новое среднее значение
     */
    public void updateAvgMark(Long profileId, BigDecimal newAvgMark) {
        Profile profile = this.getProfileById(profileId);
        profile.setRating(newAvgMark);
        this.saveProfile(profile);
    }

    /**
     * Превратить сущность в ДТО
     *
     * @param profile сущность
     *
     * @return ДТО с данными
     */
    private static ProfileDto buildDto(Profile profile) {
        return ProfileDto.builder()
                .id(profile.getId())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .middleName(profile.getMiddleName())
                .city(profile.getCity().name())
                .photo(UtilsService.convertPhotoToString(profile.getPhoto()))
                .rating(profile.getRating())
                .userId(profile.getUser().getId())
                .build();
    }

}
