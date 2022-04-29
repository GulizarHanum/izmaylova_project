package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@Validated
@Schema(description = "Данные сообщения")
public class MessageDto {

    @Schema(description = "Идентификатор сообщения")
    private Long id;

    @Schema(description = "Идентификатор диалога")
    private Long dialogId;

    @Schema(description = "Идентификатор отправителя")
    private Long senderId;

    @Schema(description = "Идентификатор получателя")
    private Long receiverId;

    @NotNull
    @Schema(description = "Текст")
    private String text;

    @Schema(description = "Дата и время отправления")
    private LocalDateTime dispatchDateTime;

    @Schema(description = "Прочитано/непрочитано")
    private Boolean isChecked;
}
