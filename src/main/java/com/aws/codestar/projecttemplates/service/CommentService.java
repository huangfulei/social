/*
package com.aws.codestar.projecttemplates.service;

import com.aws.codestar.projecttemplates.DAO.CommentDao;
import com.aws.codestar.projecttemplates.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentDao commentDao;

    public void saveComment(Comment comment) {
        comment.setDateTime(LocalDateTime.now().toString());
        commentDao.save(comment);
    }

    public Iterable<Comment> getComments(Integer postID, Integer pageSize, Integer index) {

        Integer firstItemNumber = index * pageSize;
        return commentDao.findByPostID(postID, firstItemNumber, pageSize);
    }

    public Long getTotalCountOfComments(Integer postID) {
        return commentDao.getCommentCountByPostID(postID);
    }
}
*/
