package com.ex.springaws.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter         // 해당 클래스에 get메소드 생성
@RequiredArgsConstructor    // 선언된 final 필드가 포함된 생성자를 생성, final이 아닌 것은 생성자에 포함 X
public class HelloResponseDto {

    private final String name;
    private final int amount;

    /*
    @RequiredArgsConstructor로 자동으로 아래와 같은 생성자를 만들어준다
    public HelloResponseDto(String name, int amount){
        this.name = name;
        this.amount = amount;
    }
    */
}
