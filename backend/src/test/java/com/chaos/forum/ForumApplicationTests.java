package com.chaos.forum;

import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.tools.SortType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ForumApplicationTests {

    @Test
    public void contextLoads() {
        System.out.println(SortType.ASD.equals(SortType.ASD));
//        System.out.println(this.te((n) -> n + " 王花花"));
//        System.out.println(DatabaseTools.humpIsUnderlined("articleCategoryId"));
    }

    private String n = "hello";

    public String te(Tt t) {
        return t.tttt(n);
    }

}

interface Tt {
    String tttt(String n);
}
//spring:
//        datasource:
//        url: jdbc:mysql://127.0.0.1:3306/forum?serverTimezone=UTC
//        username: root
//        password: 123456
//        driver-class-name: com.mysql.cj.jdbc.Driver
//
//        jackson:
//default-property-inclusion: non_null
//        mvc:
//        throw-exception-if-no-handler-found: true
//        mybatis-plus:
//        mapper-locations: classpath:mapper/*.xml
//  configuration:
//    #开启驼峰转换
//    map-underscore-to-camel-case: true
//
//    #文件上传路径
//forum:
//  file:
//    upload: E:/project/chaos-forum/backend/src/main/resources/static/
//
//    static-url: http://10.0.18.37:8080/image/


