package ru.solarlab.study.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.DialogDto;
import ru.solarlab.study.entities.Advertisement;
import ru.solarlab.study.entities.Dialog;
import ru.solarlab.study.repository.DialogRepository;
import ru.solarlab.study.service.advertisements.AdvertisementService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Логика для работы с диалогами
 */
@Service
@AllArgsConstructor
@Transactional
public class DialogService {
    private final DialogRepository dialogRepository;
    private final AdvertisementService advertisementService;

    /**
     * Возвращает сущность Диалог по айди
     *
     * @param id айди диалога
     *
     * @return сущность Диалог
     */
    public Dialog getDialogById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор диалога");
        }
        return dialogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Диалог с id = %s не найден", id)));
    }

    /**
     * Получить диалог по его айди
     *
     * @param id айди диалога
     *
     * @return ДТО
     */
    public DialogDto getDialogDtoById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор диалога");
        }
        return dialogRepository.findById(id)
                .map(this::buildDto)
                .orElse(null);
    }

    /**
     * Получаем список диалогов по айди объявления
     *
     * @param advertisementId айди объявления
     *
     * @return возвращаем список диалогов
     */
    public List<DialogDto> findByAdvertisementId(Long advertisementId) {
        if (advertisementId == null) {
            throw new IllegalArgumentException("Неверный идентификатор объявления");
        }
        return dialogRepository.findByAdvertisementId(advertisementId)
                .stream()
                .map(this::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Получаем список диалогов продавца
     *
     * @param sellerId айди продавца
     *
     * @return возвращаем список объявлений
     */
    public List<DialogDto> findBySellerAdvertisement(Long sellerId) {
        if (sellerId == null) {
            throw new IllegalArgumentException("Неверный идентификатор профиля продавца");
        }
        return dialogRepository.findBySellerAdvertisements(sellerId)
                .stream()
                .map(this::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Создать диалог
     *
     * @param dto данные диалога
     */
    public void createDialog(DialogDto dto) {
        if (dialogRepository.findById(dto.getId()).isPresent()) {
            Advertisement advertisementId = advertisementService.getAdvertisementById(dto.getAdvertisementId());

            Dialog dialog = new Dialog();
            dialog.setId(dto.getId());
            dialog.setAdvertisement(advertisementId);

            dialogRepository.save(dialog);
        } else {
            throw new EntityExistsException(String.format("Диалог с id %s уже существует!", dto.getId()));
        }
    }

    /**
     * Удаление диалога по айди
     *
     * @param id айди диалога
     */
    public void deleteDialog(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор диалога");
        }
        dialogRepository.deleteById(id);
    }

    /**
     * Превратить сущность в ДТО
     *
     * @param dialog сущность Диалог
     *
     * @return ДТО с данными
     */
    private DialogDto buildDto(Dialog dialog) {
        return DialogDto.builder()
                .id(dialog.getId())
                .advertisementId(dialog.getAdvertisement().getId())
                .build();
    }
}
