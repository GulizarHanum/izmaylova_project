package ru.solarlab.study.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.solarlab.study.dto.MessageDto;
import ru.solarlab.study.entities.Dialog;
import ru.solarlab.study.entities.Message;
import ru.solarlab.study.entities.Profile;
import ru.solarlab.study.repository.MessageRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Логика для работы с сообщениями
 */
@Service
@AllArgsConstructor
@Transactional
public class MessageService {

    private final ProfileService profileService;
    private final DialogService dialogService;
    private final MessageRepository messageRepository;

    /**
     * Создание сообщения
     *
     * @param dto данные сообщения
     */
    public void createMessage(MessageDto dto) {
        Profile senderProfile = profileService.getProfileById(dto.getSenderId());
        Profile receiverProfile = profileService.getProfileById(dto.getReceiverId());
        Dialog dialogId = dialogService.getDialogById(dto.getDialogId());
        Message message = new Message();
        message.setText(dto.getText());
        message.setSender(receiverProfile);
        message.setReceiver(receiverProfile);
        message.setDialog(dialogId);
        message.setSender(senderProfile);
        message.setDispatchDateTime(LocalDateTime.now());
        message.setChecked(dto.getIsChecked());
        messageRepository.save(message);
    }

    /**
     * Удаление сообщения по айди
     *
     * @param id айди сообщения
     */
    public void deleteMessage(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Неверный идентификатор сообщения");
        }
        messageRepository.deleteById(id);
    }

    /**
     * Получить все сообщения по айди диалога
     *
     * @param dialogId идентификатор диалога
     *
     * @return сообщения диалога
     */
    public List<MessageDto> getAllMessageByDialogId(Long dialogId) {
        if (dialogId == null) {
            throw new IllegalArgumentException("Неверный идентификатор диалога");
        }
        return messageRepository.findMessagesByDialog(dialogId)
                .stream()
                .map(this::buildDto)
                .collect(Collectors.toList());
    }

    /**
     * Превратить ДТО в сущность
     *
     * @param dto данные
     *
     * @return сущность Сообщение
     */
    public Message buildEntity(MessageDto dto) {
        Profile senderProfile = profileService.getProfileById(dto.getSenderId());
        Profile receiverProfile = profileService.getProfileById(dto.getReceiverId());
        Dialog dialog = dialogService.getDialogById(dto.getDialogId());
        Message message = new Message();
        message.setText(dto.getText());
        message.setSender(receiverProfile);
        message.setReceiver(receiverProfile);
        message.setDialog(dialog);
        message.setSender(senderProfile);
        message.setDispatchDateTime(LocalDateTime.now());
        message.setChecked(dto.getIsChecked());
        return message;
    }

    /**
     * Превращает сущность в ДТО
     *
     * @param message сущность
     *
     * @return ДТО с данными
     */
    public MessageDto buildDto(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                .dialogId(message.getDialog().getId())
                .dispatchDateTime(message.getDispatchDateTime())
                .isChecked(message.isChecked())
                .receiverId(message.getReceiver().getId())
                .senderId(message.getSender().getId())
                .text(message.getText())
                .build();
    }
}
