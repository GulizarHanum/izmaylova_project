package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@Builder
@Validated
@Schema(description = "Данные категории и её подкатегорий")
public class CategoryDto {

    @NotNull
    @Schema(description = "Название категории")
    private String category;

    @Schema(description = "Список названий подкатегорий")
    private Set<String> subcategory;
}
