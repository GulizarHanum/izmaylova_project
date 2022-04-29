package ru.solarlab.study.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

/**
 * Категории товаров
 */
public enum CategoryEnum {
    ELECTRONICS("Электроника"),
    CLOTHES("Одежда"),
    REALTY("Недвижимость"),
    ANIMALS("Животные"),
    TRANSPORT("Транспорт"),
    OTHER("Другое");

    private final String name;

    CategoryEnum(String name) {
        this.name = name;
    }

    @Override
    @JsonValue
    public String toString() {
        return String.valueOf(name);
    }

    /**
     * Получить значение енума из строки
     *
     * @param text строковое представление значения енума (напр. "Электроника")
     *
     * @return значение енума (Category.ELECTRONICS)
     */
    @JsonCreator
    public static CategoryEnum fromValue(String text) {
        return Arrays.stream(CategoryEnum.values())
                .filter(candidate -> candidate.name.equals(text))
                .findFirst()
                .orElse(null);
    }
}
