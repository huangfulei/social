package com.aws.codestar.projecttemplates.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping("/user")
    public String getUsers(){
        return "this is fulei";
    }
}
