package com.chaos.forum.controller;

import com.chaos.forum.entity.ArticleComment;
import com.chaos.forum.service.IArticleCommentService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
public class ArticleCommentController {

    @Autowired
    private IArticleCommentService articleCommentService;

    /**
     * 创建文章评论
     *
     * @param session
     * @param articleComment
     * @return
     */
    @PostMapping("/saveComment")
    public ResultVO saveComment(HttpSession session, ArticleComment articleComment) {
        return this.articleCommentService.SaveComment(session, articleComment);
    }

    @PostMapping()
    public ResultVO replyComment(HttpSession session, ArticleComment articleComment) {
        return this.articleCommentService.replyComment(session, articleComment);
    }

}