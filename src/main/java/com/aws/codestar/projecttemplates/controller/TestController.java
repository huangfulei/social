package com.aws.codestar.projecttemplates.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class TestController {

    /*@RequestMapping("/user")
    public String getUsers(){

        String endpoint = System.getProperty("API_ENDPOINT");
        System.out.println("endpoint is: "+endpoint);
        return "this is fulei and i'm going to deploy angular the next step";
    }*/

    @RequestMapping("testPage")
    public ModelAndView test(){

        System.out.println("this is a test");
        ModelAndView mav = new ModelAndView("test");
        return mav;
    }

    @RequestMapping("/home")
    public RedirectView showHomePage(){
        return new RedirectView("/");
    }
}
