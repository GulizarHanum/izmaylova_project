package ru.solarlab.study.service.advertisements;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.AdvertisementDto;
import ru.solarlab.study.dto.AdvertisementStatsDto;
import ru.solarlab.study.entities.Address;
import ru.solarlab.study.entities.Advertisement;
import ru.solarlab.study.entities.CategoryEnum;
import ru.solarlab.study.entities.Profile;
import ru.solarlab.study.repository.advertisements.AdvertisementRepository;
import ru.solarlab.study.service.ProfileService;
import ru.solarlab.study.service.UtilsService;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Логика для работы с объявлениями
 */
@Service
@AllArgsConstructor
@Transactional
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ProfileService profileService;

    /**
     * Создание объявления
     *
     * @param dto объект с данными
     */
    public void createAdvertisement(AdvertisementDto dto) {
        Address address = Address.builder()
                .city(dto.getCity())
                .street(dto.getStreet())
                .house(dto.getHouse())
                .build();

        Profile seller = profileService.getProfileById(dto.getSellerId());
        Advertisement advertisement = new Advertisement();
        advertisement.setName(dto.getName());
        advertisement.setCategory(dto.getCategory());
        advertisement.setSubcategory(dto.getSubcategory());
        advertisement.setCost(dto.getCost());
        advertisement.setCreateDateTime(LocalDateTime.now());
        advertisement.setSeller(seller);
        advertisement.setDescription(dto.getDescription());
        advertisement.setAddress(address);
        advertisementRepository.save(advertisement);
    }

    /**
     * Получить все объявления
     *
     * @return список объявлений
     */
    public List<AdvertisementDto> getAllAdvertisements() {
        return advertisementRepository
                .findAll()
                .stream()
                .map(advertisement -> AdvertisementService.buildDto(advertisement))
                .collect(Collectors.toList());
    }

    /**
     * Получить объявления по нескольким айди
     *
     * @return список необходимых объявлений
     */
    public List<AdvertisementDto> getAdvertisementsByIds(List<Long> ids) {
        return StreamSupport.stream(advertisementRepository
                        .findAllById(ids).spliterator(), false)
                .map(AdvertisementService::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Пометить объявление как закрытое
     *
     * @param id айди объявления
     */
    public void closeAdvertisement(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор объявления");
        }
        Advertisement advertisementRecord = getAdvertisementById(id);
        if (advertisementRecord.getSellDateTime() == null) {
            advertisementRecord.setSellDateTime(LocalDateTime.now());
        } else {
            throw new IllegalArgumentException("Объявление уже закрыто");
        }
        advertisementRepository.save(advertisementRecord);
    }

    /**
     * Получить список открытых объявлений
     *
     * @return список открытых объявлений
     */
    public List<AdvertisementDto> getActiveAdvertisements() {
        return advertisementRepository.findAdvertisementBySellDateTimeIsNull()
                .stream().map(advertisement -> AdvertisementService.buildDto(advertisement))
                .collect(Collectors.toList());
    }

    /**
     * Получить объявление по айди
     *
     * @param id айди объявления
     *
     * @return объявление
     */
    public AdvertisementDto getAdvertisementDtoById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор объявления");
        }
        return advertisementRepository.findById(id)
                .map(AdvertisementService::buildDto)
                .orElse(null);
    }

    /**
     * Получение объявлений по похожему названию
     *
     * @param name название
     *
     * @return список найденных объявлений
     */
    public List<AdvertisementDto> getAdvertisementDtoBySimilarName(String name) {
        if (name == null) {
            throw new IllegalArgumentException("Неверное название объявления");
        }
        return advertisementRepository.findAdvertisementsByNameLike(name)
                .stream()
                .map(AdvertisementService::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Получение объявлений по категории
     *
     * @param category необходимая категория для поиска
     *
     * @return Список найденных объявлений
     */
    public List<AdvertisementDto> getAdvertisementDtoByCategory(String category) {
        CategoryEnum categoryEnum = CategoryEnum.fromValue(category);
        if (categoryEnum == null) {
            throw new IllegalArgumentException("Неверная категория");
        }
        return advertisementRepository.findByCategory(categoryEnum)
                .stream()
                .map(AdvertisementService::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Получение объявлений по подкатегории
     *
     * @param subcategory необходимая подкатегория для поиска
     *
     * @return список найденных объявлений
     */
    public List<AdvertisementDto> getAdvertisementDtoBySubcategory(String subcategory) {
        if (subcategory == null) {
            throw new IllegalArgumentException("Неверная подкатегория");
        }
        return advertisementRepository.findAdvertisementBySubcategory(subcategory)
                .stream()
                .map(AdvertisementService::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Получение объявлений по айди продавца
     *
     * @param sellerId айди продавца
     *
     * @return список объявлений продавца
     */
    public List<AdvertisementDto> getAdvertisementDtoBySellerId(Long sellerId) {
        if (sellerId == null) {
            throw new IllegalArgumentException("Неверный идентификатор продавца");
        }
        return advertisementRepository.findBySeller(sellerId)
                .stream()
                .map(AdvertisementService::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Возвращает сущность объявления по айди
     *
     * @param id айди объявления
     *
     * @return объявление
     */
    public Advertisement getAdvertisementById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор объявления");
        }
        return advertisementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Объявление с id = %s не найдено", id)));
    }

    /**
     * Получить статистику по объявлениям в системе
     *
     * @return статистика по объявлениям в системе
     */
    public AdvertisementStatsDto getAdvertisementsStats() {
        Long countAllAdvertisements = advertisementRepository.count();
        Long countRealisedAdvertisements = advertisementRepository.countAdvertisementsBySellDateTimeIsNotNull();

        return AdvertisementStatsDto.builder()
                .allAdvertisements(countAllAdvertisements)
                .realisedAdvertisements(countRealisedAdvertisements)
                .build();
    }

    /**
     * Редактирование объявления
     *
     * @param newAdvertisement объявление
     *
     * @return отредактированное объявление
     */
    public AdvertisementDto editAdvertisement(AdvertisementDto newAdvertisement) {
        Address address = Address.builder()
                .city(newAdvertisement.getCity())
                .street(newAdvertisement.getStreet())
                .house(newAdvertisement.getHouse())
                .build();

        List<byte[]> photos = newAdvertisement.getPhoto()
                .stream()
                .map(photo -> UtilsService.convertPhotoToByte(photo))
                .collect(Collectors.toList());

        Advertisement advertisementRecord = advertisementRepository
                .findById(newAdvertisement.getId())
                .orElseThrow(() -> new EntityNotFoundException(String.format("Объявление с id %s не найдено!", newAdvertisement.getId())));

        advertisementRecord.setAddress(address);
        advertisementRecord.setCategory(newAdvertisement.getCategory());
        advertisementRecord.setSubcategory(newAdvertisement.getSubcategory());
        advertisementRecord.setName(newAdvertisement.getName());
        advertisementRecord.setDescription(newAdvertisement.getDescription());
        advertisementRecord.setPhotos(photos);
        advertisementRecord.setCost(newAdvertisement.getCost());

        return buildDto(advertisementRepository.save(advertisementRecord));
    }

    /**
     * Удаление объявления по айди
     *
     * @param id айди объяаления
     */
    public void deleteAdvertisement(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор объявления");
        }
        advertisementRepository.deleteById(id);
    }

    /**
     * Превратить сущность в ДТО
     *
     * @param advertisement сущность
     *
     * @return ДТО с данными
     */
    static AdvertisementDto buildDto(Advertisement advertisement) {
        List<String> photos = advertisement.getPhotos()
                .stream()
                .map(photo -> UtilsService.convertPhotoToString(photo))
                .collect(Collectors.toList());

        return AdvertisementDto.builder()
                .name(advertisement.getName())
                .cost(advertisement.getCost())
                .city(advertisement.getAddress() != null ? advertisement.getAddress().getCity() : null)
                .street(advertisement.getAddress() != null ? advertisement.getAddress().getStreet() : null)
                .house(advertisement.getAddress() != null ? advertisement.getAddress().getHouse() : null)
                .photo(photos)
                .sellerId(advertisement.getSeller().getId())
                .id(advertisement.getId())
                .description(advertisement.getDescription())
                .category(advertisement.getCategory())
                .subcategory(advertisement.getSubcategory())
                .sellDateTime(advertisement.getSellDateTime())
                .createDateTime(advertisement.getCreateDateTime())
                .build();
    }

}
