package com.aws.codestar.projecttemplates.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "UserAction")
public class UserAction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ActionID")
    private Integer id;

    @Column
    private Integer userID;
    @Column
    @ElementCollection
    private List<Integer> savedPostID;
    @Column
    @ElementCollection
    private List<Integer> likedPostID;
    @Column
    @ElementCollection
    private List<Integer> commentedPostID;
    @Column
    private String dateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public List<Integer> getSavedPostID() {
        return savedPostID;
    }

    public void setSavedPostID(List<Integer> savedPostID) {
        this.savedPostID = savedPostID;
    }

    public List<Integer> getLikedPostID() {
        return likedPostID;
    }

    public void setLikedPostID(List<Integer> likedPostID) {
        this.likedPostID = likedPostID;
    }

    public List<Integer> getCommentedPostID() {
        return commentedPostID;
    }

    public void setCommentedPostID(List<Integer> commentedPostID) {
        this.commentedPostID = commentedPostID;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}
