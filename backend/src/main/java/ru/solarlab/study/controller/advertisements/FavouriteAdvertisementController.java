package ru.solarlab.study.controller.advertisements;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.AdvertisementDto;
import ru.solarlab.study.dto.FavouriteAdvertisementDto;
import ru.solarlab.study.service.advertisements.FavouriteAdvertisementService;

import java.util.List;

@RestController
@RequestMapping("advertisements/favourites")
@AllArgsConstructor
@Tag(name = "Избранное", description = "API для работы с объявлениями из раздела \"Избранное\"")
public class FavouriteAdvertisementController {

    private final FavouriteAdvertisementService service;

    @GetMapping("/profile/{profileId}")
    @Operation(description = "Получить все избранные объявления профиля")
    public List<AdvertisementDto> getAllFavouriteAdvertisements(@PathVariable Long profileId) {
        return service.getFavouriteAdvertisementsByProfileId(profileId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Добавить объявление в Избранное")
    public void addToFavourites(@Parameter(description = "Данные объявления и профиля") @RequestBody FavouriteAdvertisementDto dto) {
        service.addToFavourites(dto);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Убрать объявления из Избранного у профиля")
    public void removeFromFavourites(@Parameter(description = "Данные объявления и профиля") @RequestBody FavouriteAdvertisementDto dto) {
        service.removeFromFavourites(dto);
    }

}

