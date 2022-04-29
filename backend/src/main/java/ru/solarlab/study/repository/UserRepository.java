package ru.solarlab.study.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.User;

import java.util.Optional;

/**
 * Интерфейс для работы с таблицей пользователей в БД
 */
@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    @Override
    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);
}
