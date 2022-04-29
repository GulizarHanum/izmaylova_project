package ru.solarlab.study.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

/**
 * Сущность "Диалог" с сообщениями по объявлению
 */
@Entity
@Table(name = "dialog")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Dialog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @OneToMany(mappedBy = "dialog", orphanRemoval = true)
    @EqualsAndHashCode.Exclude // исключаем замыкание при расчете хэшкода и equals
    @ToString.Exclude
    private List<Message> messages;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "advertisement_id", nullable = false)
    private Advertisement advertisement;
}
