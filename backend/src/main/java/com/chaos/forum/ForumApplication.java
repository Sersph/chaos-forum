package com.chaos.forum;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ForumApplication {

    public static void main(String[] args) {
        System.out.println("hello springboot2");
        SpringApplication.run(ForumApplication.class, args);
    }

}
