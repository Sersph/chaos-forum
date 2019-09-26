package com.chaos.forum.controller;

import com.chaos.forum.exception.DataException;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

//import com.library.nbt.utils.DateUtils;
import java.io.File;
import java.io.IOException;
import java.util.Random;
import java.util.UUID;

import static org.apache.naming.SelectorContext.prefix;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-26 20:32
 */
@RestController
public class FileController {

    /**
     * 上传的文件名
     */
    private final static String FILE_PATH = "D:\\date\\image\\";


    /** @ApiModelProperty("图片存放根路径")
     @Value("${file.rootPath}")
     private String ROOT_PATH;

     @ApiModelProperty("图片存放根目录下的子目录")
     @Value("${file.sonPath}")
     private String SON_PATH;*/

    //    private String FILE_PATH = ROOT_PATH + SON_PATH;

    static {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            file.mkdir();
        }
    }

    @RequestMapping("/file")
    public ResultVO upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {

        if (file.isEmpty()) {
            return new ResultVO(ResultEnum.FILE_ERROR);
        }

        //获取文件名
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);

        //获取文件后缀
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        System.out.println("文件后缀名： " + suffixName);

        // 重新生成唯一文件名，用于存储
        String newFileName = UUID.randomUUID().toString() + suffixName;

        //为防止文件重名被覆盖，文件名取名为：当前日期 + 1-1000内随机数
//        Random random = new Random();
//        Integer randomFileName = random.nextInt(1000);
//        String fileName = DateUtils.timeStamp2Date(String.valueOf(System.currentTimeMillis() /100),"yyyyMMddHHmmss") + randomFileName +"." +  prefix;

        System.out.println("新的文件名： " + newFileName);

        //创建文件
        File dest = new File(FILE_PATH + newFileName);

        //写入文件目录
        try {
            file.transferTo(dest);
            return new ResultVO(ResultEnum.SUCCESS, dest);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultVO(ResultEnum.FILE_ERROR);
        }
    }
}