package com.aws.codestar.projecttemplates.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "Comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CommentID")
    private Integer id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "CONTENT")
    private String content;
    @Column(name = "NUMBER_OF_LIKES")
    private Integer numberOfLikes;
    @Column(name = "IMAGE_URL")
    private String imageUrl;
    @Column(name = "REPLIES")
    private ArrayList<Comment> replies;
    @Column(name = "POST_ID")
    private Integer postID;
    @Column(name = "DATE_TIME")
    private String dateTime;

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(Integer numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ArrayList<Comment> getReplies() {
        return replies;
    }

    public void setReplies(ArrayList<Comment> replies) {
        this.replies = replies;
    }

    public Integer getPostID() {
        return postID;
    }

    public void setPostID(Integer postID) {
        this.postID = postID;
    }
}
