package com.ex.springaws.domain.posts;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest     // H2 데이터베이스 자동 실행
public class PostsRepositoryTest {

    @Autowired
    PostsRepository postsRepository;

    @AfterEach      // 테스트가 종료 될 때 마다 실행
    public void cleanup(){
        postsRepository.deleteAll();
    }

    @Test
    public void shouldLoadPosts(){
        // given
        String title = "Test Post";
        String content = "Test Content Body";

        // save : update/insert 수행. id값 존재 여부로 판단
        postsRepository.save(Posts.builder()
                .title(title)
                .content(content)
                .author("tkppp@gmail.com")
                .build()
        );

        // when
        // findAll : 테이블에 있는 모든 데이터를 조회
        List<Posts> postsList = postsRepository.findAll();

        // then
        Posts posts = postsList.get(0);
        assertThat(posts.getTitle()).isEqualTo(title);
        assertThat(posts.getContent()).isEqualTo(content);
    }

    @Test
    public void ShouldRegisterBaseEntity(){
        //given
        LocalDateTime now = LocalDateTime.of(2019,6,4,0,0,0);
        postsRepository.save(Posts.builder()
                .title("title")
                .content("content")
                .author("author")
                .build());

        //when
        List<Posts> postsList = postsRepository.findAll();

        //then
        Posts posts = postsList.get(0);
        System.out.println(">>>>>>>>>>createdAt : " + posts.getCreatedAt() + " modifiedAt : " + posts.getModifiedAt());

        assertThat(posts.getCreatedAt()).isAfter(now);
        assertThat(posts.getModifiedAt()).isAfter(LocalDate.from(now));
    }
}
