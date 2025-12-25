package com.example.currencybackend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloJava {

    // Example: http://localhost:8080/hello?name=Akash
    @GetMapping("/hello")
    public String hello(@RequestParam String name) {
        return "Hello " + name + ", this is my first Spring Boot API";
    }

    // Example: http://localhost:8080/test
    @GetMapping("/test")
    public String test() {
        return "Spring Boot is running successfully 🚀";
    }
}
