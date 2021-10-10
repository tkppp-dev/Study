package com.ex.springaws.domain.posts;

import com.ex.springaws.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Posts extends BaseTimeEntity {

    @Id     // pk 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // PK의 생성 규칙 설정. auto_increment 설정
    private Long id;

    // @Column 어노테이션은 테이블의 컬럼을 의미하며 선언하지 않아도 자동으로 적용됨. 사용하는 이유는 기본값 외 추가 옵션을 지정할 때
    // String의 경우 VARCHAR(255)가 기본 설정
    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }
}
