package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Data
@Builder
@Validated
@Schema(description = "Данные диалога")
public class DialogDto {

    @Schema(description = "Идентификатор")
    private Long id;

    @NotNull
    @Schema(description = "Идентификатор объявления")
    private Long advertisementId;
}
