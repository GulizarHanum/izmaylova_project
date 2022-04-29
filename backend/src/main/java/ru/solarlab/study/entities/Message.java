package ru.solarlab.study.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Сущность "Сообщения"
 */
@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dialog_id", nullable = false)
    private Dialog dialog;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private Profile sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiver_id", nullable = false)
    private Profile receiver;

    @Column(name = "text")
    private String text;

    @Column(name = "dispatch_date_time")
    private LocalDateTime dispatchDateTime;

    @Column(name = "is_checked")
    private boolean isChecked;
}
