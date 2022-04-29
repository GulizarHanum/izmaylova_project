package ru.solarlab.study.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

/**
 * Сущность "Категория" со списком подкатегорий
 */
@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Category {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private CategoryEnum category;

    @ElementCollection
    @CollectionTable(name = "category_subcategories", joinColumns = @JoinColumn(name = "category_name"))
    @Column(name = "subcategory")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<String> subcategory;
}
