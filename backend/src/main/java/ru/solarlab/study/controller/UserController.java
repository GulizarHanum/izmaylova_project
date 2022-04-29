package ru.solarlab.study.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.AuthDataRequestDto;
import ru.solarlab.study.dto.UserDto;
import ru.solarlab.study.dto.UserStatsDto;
import ru.solarlab.study.service.UserService;

import static ru.solarlab.study.configuration.SecurityConfig.DELETE_ENDPOINT;
import static ru.solarlab.study.configuration.SecurityConfig.REGISTER_ADMIN_ENDPOINT;

/**
 * Контроллер пользователей
 */
@RestController
@AllArgsConstructor
@Tag(name = "Пользователи", description = "API управления пользователями системы")
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/public/users/stats")
    @Operation(description = "Получить статистику по пользователям в системе")
    public UserStatsDto getUsersStats() {
        return userService.getUsersStats();
    }

    @PostMapping("/public/users/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Регистрация пользователя")
    public void registerUser(@RequestBody AuthDataRequestDto registerData) {
        userService.createUser(registerData, false);
    }

    @PostMapping(REGISTER_ADMIN_ENDPOINT)
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Регистрация администратора")
    public void registerAdmin(@RequestBody AuthDataRequestDto registerData) {
        userService.createUser(registerData, true);
    }

    @PatchMapping("/users")
    @Operation(description = "Редактирование пользователя")
    public UserDto editUserDto(@RequestBody UserDto user) {
        return userService.editUserDto(user);
    }

    @DeleteMapping(DELETE_ENDPOINT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удаление пользователя")
    public void deleteUser(@RequestBody Long id) {
        userService.deleteUser(id);
    }

}
