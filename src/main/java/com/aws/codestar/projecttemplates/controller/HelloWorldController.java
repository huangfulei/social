package com.aws.codestar.projecttemplates.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Basic Spring MVC controller that handles all GET requests.
 */
@RestController
public class HelloWorldController {

    @RequestMapping("/")
    public String helloWorld() {
        return "this is home page";
    }

}
