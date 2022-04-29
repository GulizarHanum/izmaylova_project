package ru.solarlab.study.exceptions;

/**
 * Исключение "Неверные данные для аутентификации"
 */
public class BadAuthCredentialsException extends RuntimeException {

    public BadAuthCredentialsException() {
        super();
    }

    public BadAuthCredentialsException(String message) {
        super(message);
    }
}
