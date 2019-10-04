package com.chaos.forum.service.impl;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IFileService;
import com.chaos.forum.tools.ImageTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;

/**
 * <p>
 * { 文件上傳處理 }
 * </p>
 *
 * @Author kay
 * 2019-09-29 19:51
 */
@Service
public class FileServiceImpl implements IFileService {

    @Autowired
    private ImageTools imageTools;

    /**
     * 上传文件的路径
     */
    @Value("${forum.file.upload}")
    private String upload;

    @Value("${forum.file.static-url}")
    private String staticUrl;

    @Override
    public ResultVO upload(MultipartFile file, HttpServletRequest request) {
        if (file.isEmpty()) {
            return new ResultVO(ResultEnum.FILE_NOT_NULL);
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
            List<String> list = new ArrayList<>();
            list.add(imageTools.singleImage(this.upload + newFileName));
            list.add(this.staticUrl + newFileName);
            return new ResultVO(ResultEnum.SUCCESS, list);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultVO(ResultEnum.FILE_ERROR);
        }
    }

}
