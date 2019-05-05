package com.aws.codestar.projecttemplates.service;

import com.aws.codestar.projecttemplates.DAO.PostDao;
import com.aws.codestar.projecttemplates.model.Post;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostService {
    private static final Logger LOGGER = LogManager.getLogger(PostService.class);

    @Autowired
    private PostDao postDao;

    public Iterable<Post> getRecommendedPosts(Integer pageSize, Integer index) {
        Integer firstItemNumber = index * pageSize;

        LOGGER.info("first item number is: " + firstItemNumber);
        LOGGER.info("page size is: " + pageSize);
        Iterable<Post> posts = postDao.findRecommendedPosts(firstItemNumber, pageSize);
        for (Post post : posts) {
            String date = post.getDateTime().substring(0, 10);
            String time = post.getDateTime().substring(11);
            LocalDate localDate = LocalDate.parse(date);

            if (!localDate.equals(LocalDate.now()) && localDate.getYear() == LocalDate.now().getYear()) {
                // if the post is posted this year, only display month and date
                post.setDateTime(post.getDateTime().substring(5));
            } else {
                post.setDateTime(time);
            }
        }

        return posts;
    }

    public void savePost(Post newPost) {
        newPost.setDateTime(LocalDateTime.now().toString());
        postDao.save(newPost);
    }

    public Optional<Post> getPost(Integer id) {
        return postDao.findById(id);
    }

    public Optional<Post> getPostByAuthor(String author) {
        return postDao.findByAuthor(author);
    }

    public Iterable<Post> getLatestPosts(Integer time, PageRequest post) {
        return postDao.findByTime(time, post);
    }

    public Long getTotalNumberOfPosts() {
        return postDao.count();
    }

    @Transactional
    public void updateTotalNumberOfLikes(Integer numberOfLikes, Integer postID) {
        System.out.println("number of likes: "+ numberOfLikes +"post ID: "+ postID);
        System.out.println("number of updated: "+ postDao.updateTotalNumberOfLikes(numberOfLikes, postID));
    }
}
