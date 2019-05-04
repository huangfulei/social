package com.aws.codestar.projecttemplates.util;

import com.aws.codestar.projecttemplates.model.User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.LogManager;
import java.util.logging.Logger;

@Component
public class UserUtil {
    private static final Logger logger = LogManager.getLogManager().getLogger("UserUtil: ");

    public User getUserFromRequest(HttpServletRequest request){
        User user = new User();
        user.setName(getUserName(request));
        user.setEmail(getEmail(request));
        user.setPassword(getPassword(request));
        return user;
    }

    private String getPassword(HttpServletRequest request) {
        //todo: need to be secured
        return request.getHeader("password");
    }

    private String getEmail(HttpServletRequest request) {
        //logger.info("user email is: "+ request.getHeader("email"));
        return request.getHeader("email");
    }

    private String getUserName(HttpServletRequest request) {
        return request.getHeader("username");
    }
}
