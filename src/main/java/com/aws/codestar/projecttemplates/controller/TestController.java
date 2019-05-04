package com.aws.codestar.projecttemplates.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping("/user")
    public String getUsers(){

        String endpoint = System.getProperty("API_ENDPOINT");
        System.out.println("endpoint is: "+endpoint);
        return "this is fulei";
    }
}
