package com.aws.codestar.projecttemplates.service;

import com.aws.codestar.projecttemplates.DAO.UserDao;
import com.aws.codestar.projecttemplates.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger LOGGER = LogManager.getLogger(UserService.class);

    @Autowired
    private UserDao userDao;


    public User saveNewUser(User user) {
        LOGGER.info("starting saving new user");

        //check duplicate records
        User userWithSameName = userDao.findByName(user.getName());
        User userWithSameEmail = userDao.findByEmail(user.getEmail());

        if (userWithSameName != null) {
            user.setStatusCode(1);
            user.setStatusMsg("the name has been used");
            return user;
        } else if (userWithSameEmail != null) {
            user.setStatusCode(2);
            user.setStatusMsg("the email has been used");
            return user;
        } else {
            try {
                userDao.save(user);
                user.setStatusCode(0);
                user.setStatusMsg("sign up successful");
                return user;
            } catch (DataIntegrityViolationException exc) {
                LOGGER.error(exc.getMessage());
                user.setStatusCode(3);
                user.setStatusMsg(exc.getMessage());
                return user;
            }
        }
    }

    public User authUser(User user) {
        //get user from DB by email
        User userInDB = userDao.findByEmail(user.getEmail());
        if (userInDB == null) {
            user.setStatusCode(4);
            user.setStatusMsg("user doesn't exist, please sign up");
            return user;
        } else {
            System.out.println("user in database is: " + userInDB.getName());
            if (userInDB.getPassword().equals(user.getPassword())) {
                userInDB.setStatusCode(0);
                return userInDB;
            } else {
                user.setStatusCode(5);
                user.setStatusMsg("invalid password");
                return user;
            }
        }
    }

    public void updateUser(User user) {
        userDao.save(user);
    }

    public User getUserByEmail(String email) {
        return userDao.findByEmail(email);
    }
}
