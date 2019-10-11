package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.service.IArticleLikeService;
import com.chaos.forum.vo.ResultVO;
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
public class ArticleLikeController {

    @Autowired
    private IArticleLikeService articleLikeService;

    /**
     * 文章点赞
     *
     * @param session
     * @param articleLike
     * @return
     */
    @Calibrator
    @PostMapping("/like")
    public ResultVO articleLike(HttpSession session, ArticleLike articleLike) {
        return this.articleLikeService.saveLiked(session, articleLike);
    }

}