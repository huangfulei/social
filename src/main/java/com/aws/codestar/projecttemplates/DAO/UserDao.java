package com.aws.codestar.projecttemplates.DAO;

import com.aws.codestar.projecttemplates.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDao extends CrudRepository<User, Integer> {

//    @Query(value = "select u from User u where u.email = ")
    User findByEmail(String email);

    User findByName(String name);
}
