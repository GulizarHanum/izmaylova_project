package ru.solarlab.study.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.RefreshToken;

import java.util.Optional;
import java.util.UUID;

/**
 * Интерфейс для работы с таблицей refresh-токенов в БД
 */
@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(UUID token);
}
