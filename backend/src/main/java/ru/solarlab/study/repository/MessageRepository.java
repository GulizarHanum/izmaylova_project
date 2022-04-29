package ru.solarlab.study.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Message;

import java.util.List;

/**
 * Интерфейс для работы с таблицей сообщений в БД
 */
@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    @Query(value = "select * from message where dialog_id = :dialogId", nativeQuery = true)
    List<Message> findMessagesByDialog(@Param(value = "dialogId") Long id);
}
