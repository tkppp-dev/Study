package com.ex.springaws.web.dto;

import com.ex.springaws.domain.posts.Posts;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PostsListResponseDto {
    private Long id;
    private String title;
    private String author;
    private LocalDate modifiedAt;

    public PostsListResponseDto(Posts entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.modifiedAt = entity.getModifiedAt();
    }
}
