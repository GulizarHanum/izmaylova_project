package ru.solarlab.study.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.CategoryDto;
import ru.solarlab.study.entities.Category;
import ru.solarlab.study.entities.CategoryEnum;
import ru.solarlab.study.repository.CategoryRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Логика для работы с категориями и подкатегориями
 */
@Service
@AllArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Получить все категории
     *
     * @return список категорий и подкатегорий
     */
    public List<CategoryDto> getCategories() {
        return StreamSupport.stream(categoryRepository.findAll().spliterator(), false)
                .map(this::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Удаление подкатегории
     *
     * @param subcategory удаляемая подкатегория
     */
    public void deleteSubcategory(String subcategory) {
        if (subcategory == null) {
            throw new IllegalArgumentException("Неверное название подкатегории");
        }
        Category category = categoryRepository
                .findBySubcategory(subcategory)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Подкатегория %s не относится ни к одной категории", subcategory)));

        category.getSubcategory().remove(subcategory);
        categoryRepository.save(category);
    }

    /**
     * Добавление новой подкатегории в категорию
     *
     * @param dto категория
     */
    public void addSubcategory(CategoryDto dto) {
        CategoryEnum categoryEnum = CategoryEnum.fromValue(dto.getCategory());

        Category categoryRecord = categoryRepository
                .findById(categoryEnum)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Категория %s не найдена!", categoryEnum.name())));

        Set<String> subcategoriesList = categoryRecord.getSubcategory();
        subcategoriesList.addAll(dto.getSubcategory());

        categoryRepository.save(categoryRecord);
    }

    /**
     * Превратить модель в ДТО
     *
     * @param category категория
     *
     * @return возвращаем ДТО
     */
    private CategoryDto buildDto(Category category) {
        return CategoryDto.builder()
                .category(category.getCategory().toString())
                .subcategory(category.getSubcategory())
                .build();
    }
}
