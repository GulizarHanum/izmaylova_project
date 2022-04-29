package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Статистика по объявлениям")
public class AdvertisementStatsDto {

    @Schema(description = "Всего объявлений в системе")
    private Long allAdvertisements;

    @Schema(description = "Количество реализованных объявлений")
    private Long realisedAdvertisements;
}
