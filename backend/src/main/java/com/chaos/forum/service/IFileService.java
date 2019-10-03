package com.chaos.forum.service;

import com.chaos.forum.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-29 19:50
 */
public interface IFileService {

    ResultVO upload(MultipartFile file, HttpServletRequest request);
}
