/*
package com.aws.codestar.projecttemplates.controller;

import com.aws.codestar.projecttemplates.model.Comment;
import com.aws.codestar.projecttemplates.service.CommentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentsController {

    private static final Logger LOGGER = LogManager.getLogger(CommentsController.class);

    @Autowired
    CommentService commentService;

    @PostMapping("/saveComment")
    public void saveComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);

    }

    @GetMapping("/getComments/{postID}/{pageSize}/{index}")
    public Iterable<Comment> getComments(@PathVariable(value = "postID") Integer postID,
                                         @PathVariable(value = "pageSize") Integer pageSize,
                                         @PathVariable(value = "index") Integer index) {
        return commentService.getComments(postID, pageSize, index);
    }

    @GetMapping("/getTotalCountOfComments/{postID}")
    public Long getTotalCountOfComments(@PathVariable(value = "postID") Integer postID) {
        LOGGER.info("postID is: " + postID);
        LOGGER.info("comments number: " + commentService.getTotalCountOfComments(postID));
        return commentService.getTotalCountOfComments(postID);
    }

}
*/
