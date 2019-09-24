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
