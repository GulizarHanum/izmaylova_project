package ru.solarlab.study.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Builder
@Validated
@Schema(description = "Данные профиля")
public class ProfileDto {

    @Schema(description = "Идентификатор")
    private Long id;

    @Schema(description = "Идентификатор пользователя, которому принадлежит профиль")
    private Long userId;

    @NotNull
    @Schema(description = "Фамилия")
    private String lastName;

    @NotNull
    @Schema(description = "Имя")
    private String firstName;

    @Schema(description = "Отчество")
    private String middleName;

    @Schema(description = "Фото")
    private String photo;

    @Schema(description = "Рейтинг")
    private BigDecimal rating;

    @NotNull
    @Schema(description = "Город")
    private String city;

}
