package ru.solarlab.study.controller.advertisements;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.AdvertisementDto;
import ru.solarlab.study.dto.AdvertisementStatsDto;
import ru.solarlab.study.service.advertisements.AdvertisementService;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "Объявления", description = "API для работы с объявлениями")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping(path = "/public/advertisements/{id}")
    @Operation(description = "Получить объявление по айди")
    public AdvertisementDto getAdvertisementById(@Parameter(description = "Идентификатор объявления") @PathVariable("id") Long id) {
        return advertisementService.getAdvertisementDtoById(id);
    }

    @GetMapping("/public/advertisements/similarName")
    @Operation(description = "Получить список объявлений по похожему названию")
    public List<AdvertisementDto> getAdvertisementBySimilarName(@Parameter(description = "Название объявления") @RequestParam("name") String name) {
        return advertisementService.getAdvertisementDtoBySimilarName(name);
    }

    @GetMapping("/public/advertisements/category")
    @Operation(description = "Получить все объявления по категории")
    public List<AdvertisementDto> getAdvertisementByCategory(@Parameter(description = "Категория") @RequestParam("name") String category) {
        return advertisementService.getAdvertisementDtoByCategory(category);
    }

    @GetMapping("/public/advertisements/subcategory")
    @Operation(description = "Получить все объявления по подкатегории")
    public List<AdvertisementDto> getAdvertisementBySubCategory(@Parameter(description = "Подкатегория") @RequestParam(name = "name") String subcategory) {
        return advertisementService.getAdvertisementDtoBySubcategory(subcategory);
    }

    @GetMapping("/public/advertisements/seller/{id}")
    @Operation(description = "Получить все объявления по айди продавца")
    public List<AdvertisementDto> getAdvertisementBySellerId(@Parameter(description = "Идентификатор продавца") @PathVariable("id") Long sellerId) {
        return advertisementService.getAdvertisementDtoBySellerId(sellerId);
    }

    @GetMapping("/public/advertisements")
    @Operation(description = "Получить все объявления")
    public List<AdvertisementDto> getAllAdvertisements() {
        return advertisementService.getAllAdvertisements();
    }

    @GetMapping("/public/advertisements/active")
    @Operation(description = "Получить все активные объявления")
    public List<AdvertisementDto> getActiveAdvertisements() {
        return advertisementService.getActiveAdvertisements();
    }

    @GetMapping(path = "/public/advertisements/stats")
    @Operation(description = "Получить статистику по объявлениям в системе")
    public AdvertisementStatsDto getAdvertisementsStats() {
        return advertisementService.getAdvertisementsStats();
    }

    @PostMapping("/advertisements")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Создать объявление")
    public void createAdvertisement(@Parameter(description = "Данные объявления") @RequestBody AdvertisementDto dto) {
        advertisementService.createAdvertisement(dto);
    }

    @PutMapping("/advertisements")
    @Operation(description = "Отредактировать объявление")
    public AdvertisementDto editAdvertisement(@Parameter(description = "Данные объявления") @RequestBody AdvertisementDto dto) {
        return advertisementService.editAdvertisement(dto);
    }

    @PatchMapping("/advertisements/close")
    @Operation(description = "Закрыть объявление")
    public void closeAdvertisement(@Parameter(description = "Идентификатор объявления") @RequestParam("id") Long id) {
        advertisementService.closeAdvertisement(id);
    }

    @DeleteMapping(path = "/advertisements/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удалить объявление")
    public void deleteAdvertisement(@Parameter(description = "Идентификатор объявления") @PathVariable("id") Long id) {
        advertisementService.deleteAdvertisement(id);
    }


}

