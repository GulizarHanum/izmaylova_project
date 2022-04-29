package ru.solarlab.study.exceptions;

/**
 * Ошибка "Пользователь уже существует"
 */
public class UserExistsException extends RuntimeException {

    public UserExistsException() {
        super();
    }

    public UserExistsException(String message) {
        super(message);
    }
}
