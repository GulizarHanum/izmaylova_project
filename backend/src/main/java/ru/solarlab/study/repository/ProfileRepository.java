package ru.solarlab.study.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.solarlab.study.entities.Profile;

/**
 * Интерфейс для работы с БД
 */
@Repository
public interface ProfileRepository extends CrudRepository<Profile, Long> {

}
