package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.service.IArticleLikeService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { 后端前台文章管理器 }
 * </p>
 *
 * @Author kay
 * 2019-09-21 13:45
 */
@RequestMapping("/frontend/article")
@RestController
@Api(value = "后端前台文章管理器", description = "用于点赞文章")
public class ArticleLikeController {

    @Autowired
    private IArticleLikeService articleLikeService;

    @Calibrator
    @ApiOperation(value = "点赞文章")
    @PostMapping("/like")
    public ResultVO articleLike(HttpSession session, ArticleLike articleLike) {
        return this.articleLikeService.saveLiked(session, articleLike);
    }

    @Calibrator
    @ApiOperation(value = "获取所有点赞")
    @GetMapping("/selectLike")
    public ResultVO selectLike(HttpSession session, ArticleLike articleLike) {
        return this.articleLikeService.selectLikeAllUser(session, articleLike);
    }

}