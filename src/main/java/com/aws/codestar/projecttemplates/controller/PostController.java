package com.aws.codestar.projecttemplates.controller;

import com.aws.codestar.projecttemplates.model.Post;
import com.aws.codestar.projecttemplates.service.PostService;
import com.aws.codestar.projecttemplates.util.UserUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PostController extends BaseController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserUtil userUtil;

    private static final Logger LOGGER = LogManager.getLogger(PostController.class);

    /**
     * get all example
     *
     * @return
     */
    @GetMapping("/getRecommendedPosts/{size}/{index}")
    public Iterable<Post> getRecommendedPosts(@PathVariable(value = "size") Integer size,
                                              @PathVariable(value = "index") Integer index) {

        //LOGGER.info("size of posts: "+postService.gerRecommendedPosts(size, index));
        return postService.getRecommendedPosts(size, index);
    }

    @GetMapping("/getTotalNumberOfPosts")
    public Long getTotalNumberOfPosts() {
        // LOGGER.info("total number of count is: " + postService.getTotalNumberOfPosts());
        return postService.getTotalNumberOfPosts();
    }

    /**
     * get post by id with build in query
     *
     * @param id
     * @return
     */
    @GetMapping("/getPost/{id}")
    public Optional<Post> getPostById(@PathVariable(value = "id") Integer id) {
        return postService.getPost(id);
    }

    /**
     * get Post by author with custom query
     *
     * @param email
     * @return
     */
    @GetMapping("/getPost/{email}")
    public Optional<Post> getPostByEmail(@PathVariable(value = "email") String email) {
        return postService.getPostByAuthor(email);
    }

    @GetMapping("/Post/recommended/{latest}")
    public Iterable<Post> getLatestPosts(@PathVariable(value = "latest") Integer time) {
        return postService.getLatestPosts(time, PageRequest.of(1, 5, Sort.Direction.ASC, "Post"));
    }

    @PostMapping("/postPost")
    public void savePost(@RequestBody Post post) {
        postService.savePost(post);
    }

    @PutMapping("/updatePost/{id}")
    public void updateById(@PathVariable(value = "id") Integer id, @RequestBody Post post) {

    }

    @PutMapping("/updateTotalNumberOfLikes/{id}")
    public void updateTotalNumberOfLikes(@PathVariable(value = "id") Integer id, @RequestBody Integer numberOfLikes) {
        postService.updateTotalNumberOfLikes(numberOfLikes, id);
    }

    @DeleteMapping("/deletePost/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {

    }


}
