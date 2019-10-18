package com.chaos.forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * @author Shinelon
 */
@SpringBootApplication
@EnableSwagger2
public class ForumApplication {

    public static void main(String[] args) {
        System.out.println("hello springboot2");
        SpringApplication.run(ForumApplication.class, args);
    }

}
