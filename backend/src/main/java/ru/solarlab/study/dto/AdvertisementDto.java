package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;
import ru.solarlab.study.entities.CategoryEnum;
import ru.solarlab.study.entities.City;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Validated
@Schema(description = "Данные объявления")
public class AdvertisementDto {

    @Schema(description = "Идентификатор")
    private Long id;

    @NotNull
    @Schema(description = "Название")
    private String name;

    @Schema(description = "Фотографии")
    private List<String> photo;

    @NotNull
    @Schema(description = "Категория")
    private CategoryEnum category;

    @NotNull
    @Schema(description = "Подкатегория")
    private String subcategory;

    @Schema(description = "Цена")
    private BigDecimal cost;

    @Schema(description = "Описание")
    private String description;

    @NotNull
    @Schema(description = "Город")
    private City city;

    @Schema(description = "Улица")
    private String street;

    @Schema(description = "Дом")
    private String house;

    @NotNull
    @Schema(description = "Идентификатор продавца")
    private Long sellerId;

    @Schema(description = "Дата и время продажи")
    private LocalDateTime sellDateTime;

    @Schema(description = "Дата и время создания")
    private LocalDateTime createDateTime;
}
