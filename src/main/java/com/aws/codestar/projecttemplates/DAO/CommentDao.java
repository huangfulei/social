/*
package com.aws.codestar.projecttemplates.DAO;

import com.aws.codestar.projecttemplates.model.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CommentDao extends CrudRepository<Comment, Integer> {

    @Query(value = "select * from comment where post_id = ?1 order by date_time desc limit ?2, ?3", nativeQuery = true)
    public Iterable<Comment> findByPostID(Integer postID, Integer firstItemNumber, Integer pageSize);

    @Query(value = "select count(u) from Comment u where u.postID = ?1")
    public Long getCommentCountByPostID(Integer postID);
}

*/
