package ru.solarlab.study.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.MessageDto;
import ru.solarlab.study.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("messages")
@AllArgsConstructor
@Tag(name = "Сообщения", description = "API сообщений Диалогов")
public class MessageController {
    private final MessageService messageService;

    @GetMapping(path = "/dialog/{id}")
    @Operation(description = "Получить все сообщения по айди диалога.")
    public List<MessageDto> getAllMessageByDialogId(@Parameter(description = "Идентификатор диалога")@PathVariable("id") Long dialogId) { return messageService.getAllMessageByDialogId(dialogId);}

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(description = "Создать сообщение")
    public void createMessage(@Parameter(description = "Данные сообщения")@RequestBody MessageDto dto) { messageService.createMessage(dto);}

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удалить сообщение")
    public void deleteMessage(@Parameter(description = "Идентификатор сообщения")@PathVariable Long id) { messageService.deleteMessage(id);}

}
