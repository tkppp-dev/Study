package com.ex.springaws.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts,Long> {    // <EntityName, PK_TYPE>

    @Query("Select p from  Posts as p order by p.id DESC")
    List<Posts> findAllDesc();
}
