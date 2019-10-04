package com.chaos.forum.controller;

import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.service.IArticleLikeService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { 文章管理器 }
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

    @PostMapping("/like")
    public ResultVO articleLike(HttpSession session, ArticleLike articleLike) {
        return this.articleLikeService.saveLiked(session, articleLike);
    }

}