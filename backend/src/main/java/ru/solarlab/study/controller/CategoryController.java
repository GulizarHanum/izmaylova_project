package ru.solarlab.study.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.solarlab.study.dto.CategoryDto;
import ru.solarlab.study.service.CategoryService;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "Категории и подкатегории", description = "API для работы с категориями и подкатегориями объявлений")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/public/categories")
    @Operation(description = "Получить все категории")
    public List<CategoryDto> getAllCategories() {
        return categoryService.getCategories();
    }

    @PatchMapping("/categories/subcategory")
    @Operation(description = "Добавить подкатегорию")
    public void addSubcategory(@Parameter(description = "Данные категории") @RequestBody CategoryDto categoryDto) {
        categoryService.addSubcategory(categoryDto);
    }

    @DeleteMapping("/categories/subcategory")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(description = "Удалить подкатегорию")
    public void deleteSubcategory(@Parameter(description = "Подкатегория") @RequestParam String subcategory) {
        categoryService.deleteSubcategory(subcategory);
    }
}
