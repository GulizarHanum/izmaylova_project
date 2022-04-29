package ru.solarlab.study.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.DialogDto;
import ru.solarlab.study.service.DialogService;

import java.util.List;

@RestController
@RequestMapping("dialogs")
@AllArgsConstructor
@Tag(name = "Диалоги", description = "API для работы с диалогами пользователей")
public class DialogController {

    private final DialogService dialogService;

    @GetMapping(path = "{id}")
    @Operation(description = "Получить диалог по айди")
    public DialogDto getDialogById(@Parameter(description = "Идентификатор диалога") @PathVariable Long id) { return dialogService.getDialogDtoById(id);}

    @GetMapping("/advertisement/{id}")
    @Operation(description = "Получить диалоги по айди объявления")
    public List<DialogDto> findByAdvertisementId(@Parameter(description = "Идентификатор объявления") @PathVariable("id") Long advertisementId) { return dialogService.findByAdvertisementId(advertisementId);}

    @GetMapping("/seller/{id}")
    @Operation(description = "Получить диалоги по айди продавца")
    public List<DialogDto> findBySellerAdvertisement(@Parameter(description = "Идентификатор продавца") @PathVariable("id") Long sellerId) { return dialogService.findBySellerAdvertisement(sellerId);}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Создать диалог")
    public void createDialog(@Parameter(description = "Данные диалога")@RequestBody DialogDto dto){ dialogService.createDialog(dto);}

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удалить диалог по айди")
    public void deleteDialog(@Parameter(description = "Идентификатор диалога") @PathVariable Long id) { dialogService.deleteDialog(id);}

}
