package com.chaos.forum.controller;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IFileService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
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
 * { 文件上传管理 }
 * </p>
 *
 * @Author kay
 * 2019-09-26 20:32
 */
@RestController
public class FileController {

    @Autowired
    private IFileService fileService;

    /**
     * 文件上传管理
     *
     * @param file
     * @param request
     * @return
     */

    @PostMapping("/file")
    public ResultVO upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        return this.fileService.upload(file, request);
    }


}