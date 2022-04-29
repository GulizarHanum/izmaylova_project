package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Data
@Builder
@Validated
@Schema(description = "Данные избранного объявления")
public class FavouriteAdvertisementDto {

    @NotNull
    @Schema(description = "Идентификатор профиля")
    private Long profileId;

    @NotNull
    @Schema(description = "Идентификатор объявления")
    private Long advertisementId;
}
