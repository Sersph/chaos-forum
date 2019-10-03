package com.chaos.forum;

import com.chaos.forum.tools.ImageTools;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@SpringBootTest
public class ForumApplicationTests {

    @Test
    public void contextLoads() {
        String filePath = "E:\\project\\chaos-forum\\backend\\src\\main\\resources\\static\\1.jpg";
        ImageTools img = new ImageTools();
        img.singleImage(filePath);
    }

}

