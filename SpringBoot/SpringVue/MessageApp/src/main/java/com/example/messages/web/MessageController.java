package com.example.messages.web;

import com.example.messages.model.Message;
import com.example.messages.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
//@RequestMapping("/messages")    // /messages URI로 요청하는 모든 요청을 받는 컨트롤러
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/messages")
    public String index(){
        return "index";
    }

    @GetMapping("api/messages")
    @ResponseBody
    public ResponseEntity<List<Message>> getMessage(){
        List<Message> messages = messageService.getMessages();
        return ResponseEntity.ok(messages);
    }

    @PostMapping("api/messages")
    @ResponseBody
    public ResponseEntity<Message> saveMessage(@RequestBody MessageData data){
        Message saved = messageService.save(data.getText());
        if(saved == null){
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/messages/welcome")     // /messages 하위 즉 /messages/welcome 요청을 처리하는 핸들러 메소드 매핑
    /*
    @ResponseBody                  // 자바 객체(반환값)을 HTTP 응답 객체로 변환해 전송하라는 의미
    public String welcome(){
        return "Hello, Welcome to SpringBoot";
    }
    */
    // 타임리프를 이용한 모델 반환
    public String welcome(Model model){
        model.addAttribute("message", "Hello, Welcome to SpringBoot!");
        return "welcome";
    }
}
