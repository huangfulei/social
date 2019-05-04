package com.aws.codestar.projecttemplates.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLException;

@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorMessage> genericException(Exception exception) {

        System.out.println("generic exception catched: "+ exception.getMessage());
        ErrorMessage exceptionResponse = new ErrorMessage(exception.getMessage()," ");
        return new ResponseEntity<ErrorMessage>(exceptionResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SQLException.class)
    public final ResponseEntity<ErrorMessage> sqlException(Exception exception) {

        System.out.println("sqlException catched: "+ exception.getMessage());
        ErrorMessage exceptionResponse = new ErrorMessage(exception.getMessage()," ");
        return new ResponseEntity<ErrorMessage>(exceptionResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public final ResponseEntity<ErrorMessage> dataException(Exception exception) {

        System.out.println("dataException catched: "+ exception.getMessage());
        ErrorMessage exceptionResponse = new ErrorMessage(exception.getMessage()," ");
        return new ResponseEntity<ErrorMessage>(exceptionResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
