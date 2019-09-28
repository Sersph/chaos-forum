package com.chaos.forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@EnableAutoConfiguration
@SpringBootApplication
public class ForumApplication {

    public static void main(String[] args) {
        System.out.println("hello springboot2");
        SpringApplication.run(ForumApplication.class, args);
    }

}
