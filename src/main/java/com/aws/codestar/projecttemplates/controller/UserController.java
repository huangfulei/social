package com.aws.codestar.projecttemplates.controller;

import com.aws.codestar.projecttemplates.model.User;
import com.aws.codestar.projecttemplates.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController extends BaseController{

    @Autowired
    User user;
    @Autowired
    private UserService userService;

/*    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() {
        System.out.println("singleton user email is: " + user.getEmail());
        System.out.println("singleton user password is: " + user.getPassword());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("test", "testvalue");
        return new ResponseEntity<User>(this.user, httpHeaders, HttpStatus.OK);
    } */

    @RequestMapping("/getUser")
    public User getUser(@RequestParam(value = "email") String email) {
        System.out.println("singleton user email is: " + email);
        return userService.getUserByEmail(email);
    }

    @PostMapping("/saveNewUser")
    public User signUpUser(@RequestBody User user) {

        User checkedUser = userService.saveNewUser(user);
        this.user = checkedUser;

        return checkedUser;
    }

    @PostMapping("/authUser")
    public User authUser(@RequestBody User user) {

        return userService.authUser(user);
    }

    @PutMapping("/updateUser")
    public void updateUser(@RequestBody User user) {

        userService.updateUser(user);

    }

}
