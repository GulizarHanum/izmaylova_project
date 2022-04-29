package ru.solarlab.study.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Сущность "Объявление"
 */
@Entity
@Table(name = "advertisement")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Advertisement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @Column(name = "name")
    private String name;

    @ElementCollection
    @CollectionTable(name = "advertisement_photos", joinColumns = @JoinColumn(name = "advertisement_id"))
    @Column(name = "photo")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<byte[]> photos;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private CategoryEnum category;

    @Column(name = "subcategory")
    private String subcategory;

    @Column(name = "cost")
    private BigDecimal cost;

    @Column(name = "description")
    private String description;

    @Embedded
    private Address address;

    @Column(name = "create_date_time")
    private LocalDateTime createDateTime;

    @Column(name = "is_closed")
    private boolean isClosed;

    @Column(name = "sell_date_time")
    private LocalDateTime sellDateTime;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id", nullable = false)
    private Profile seller;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "profile_favourites",
            joinColumns = @JoinColumn(name = "advertisement_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "profile_id", referencedColumnName = "id"))
    @EqualsAndHashCode.Exclude // исключаем замыкание при расчете хэшкода и equals
    @ToString.Exclude
    private List<Profile> favourites;
}
