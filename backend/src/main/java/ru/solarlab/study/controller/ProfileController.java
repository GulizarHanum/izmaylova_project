package ru.solarlab.study.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.ProfileDto;
import ru.solarlab.study.service.ProfileService;

@RestController
@AllArgsConstructor
@Tag(name = "Профиль", description = "API для работы с профилями пользователей")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping(path = "/public/profiles/{id}")
    @Operation(description = "Получить профиль по айди")
    public ProfileDto getProfileById(@Parameter(description = "Идентификатор профиля") @PathVariable Long id) {
        return profileService.getProfileDtoById(id);
    }

    @PostMapping("/profiles")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Создать профиль")
    public void createProfile(@Parameter(description = "Данные профиля") @RequestBody ProfileDto dto) {
        profileService.createProfile(dto);
    }

    @PutMapping("/profiles")
    @Operation(description = "Редактировать профиль")
    public ProfileDto editProfile(@Parameter(description = "Данные профиля") @RequestBody ProfileDto dto) {
        return profileService.editProfile(dto);
    }

    @DeleteMapping(path = "{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удалить профиль")
    public void deleteProfile(@Parameter(description = "Идентификатор профиля") @PathVariable Long id) {
        profileService.deleteProfile(id);
    }
}
