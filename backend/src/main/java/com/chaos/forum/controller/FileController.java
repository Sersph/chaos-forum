package com.chaos.forum.controller;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;


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
    @Value("${forum.file.upload}")
    private String upload;

    @Value("${forum.file.static-url}")
    private String staticUrl;

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

        //new日期对象
        Date date = new Date();
        String newFileName = date.getTime() + "-" + UUID.randomUUID() + suffixName;
        System.out.println("新的文件名： " + newFileName);



        //创建文件
        File dest = new File(this.upload + newFileName);

        //写入文件目录
        try {
            file.transferTo(dest);
            return new ResultVO(ResultEnum.SUCCESS, this.staticUrl + newFileName);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultVO(ResultEnum.FILE_ERROR);
        }
    }
}