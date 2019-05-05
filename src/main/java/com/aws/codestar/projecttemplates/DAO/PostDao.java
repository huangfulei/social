/*
package com.aws.codestar.projecttemplates.DAO;

import com.aws.codestar.projecttemplates.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostDao extends CrudRepository<Post, Integer> {

    //query with JPQL query
    @Query(value = "select s from Post s where s.author = ?1")
    Optional<Post> findByAuthor(String author);

    //query with native query
    @Query(value = "select * from Post s where s.time > ?1 ", nativeQuery = true)
    Iterable<Post> findByTime(Integer time, PageRequest post);

    @Query(value = "select * from Post s order by date_time desc limit ?1, ?2", nativeQuery = true)
    Iterable<Post> findRecommendedPosts(Integer firstItemNumber, Integer pageSize);


    @Modifying()
    @Query(value = "update Post u set u.numberOfLikes =:numberOfLikes where u.id =:id")
    int updateTotalNumberOfLikes(@Param("numberOfLikes") Integer numberOfLikes, @Param("id") Integer postID);
}
*/
