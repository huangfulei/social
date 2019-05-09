package com.aws.codestar.projecttemplates.DAO;

import com.aws.codestar.projecttemplates.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostDao extends CrudRepository<Post, Integer> {

    //query with JPQL query
    //@Query(value = "select s from Post s where s.author = ?1")
    Optional<Post> findByAuthor(String author);

    //query with native query
    //@Query(value = "select * from Post s where s.time > ?1 ", nativeQuery = true)
    List<Post> findByDateTime(Pageable pageable);

    @Query(value = "select s from Post s order by s.dateTime desc")
    List<Post> findRecommendedPosts(Pageable pageable);


    @Modifying()
    @Query(value = "update Post u set u.numberOfLikes =:numberOfLikes where u.id =:id")
    int updateTotalNumberOfLikes(@Param("numberOfLikes") Integer numberOfLikes, @Param("id") Integer postID);
}
