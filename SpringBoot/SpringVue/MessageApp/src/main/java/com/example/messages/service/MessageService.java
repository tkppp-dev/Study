package com.example.messages.service;

import com.example.messages.model.Message;
import com.example.messages.repository.MessageRepository;
import com.example.messages.security.SecurityCheck;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private MessageRepository repository;

    @Autowired
    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Message> getMessages(){
        return repository.getMessages();
    }

    @SecurityCheck
    @Transactional(noRollbackFor = { UnsupportedOperationException.class })
    public Message save(String text) {
        Message message = repository.saveMessage(new Message(text));
        logger.debug("New Message[id={}] saved", message.getId());
        //updateStatistics();
        return message;
    }
    /*
    private void updateStatistics(){
        throw new UnsupportedOperationException("This method is not implemeted yet");
    }
     */
}