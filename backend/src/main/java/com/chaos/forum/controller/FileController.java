package com.chaos.forum.controller;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IFileService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
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
@Api(value = "文件上传管理器", description = "用于处理图片上传")
public class FileController {

    @Autowired
    private IFileService fileService;

    @ApiOperation(value = "文件上传管理")
    @ApiImplicitParam(name = "file", value = "图片上传", required = true, dataType = "String", paramType = "path")
    @PostMapping("/file")
    public ResultVO upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        return this.fileService.upload(file, request);
    }
}