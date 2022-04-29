package ru.solarlab.study.exceptions;

/**
 * Исключение при ошибке конвертации фото
 */
public class ConvertPhotoException extends RuntimeException {
    public ConvertPhotoException() {
        super();
    }

    public ConvertPhotoException(String message) {
        super(message);
    }

    public ConvertPhotoException(String message, Throwable cause) {
        super(message, cause);
    }
}
