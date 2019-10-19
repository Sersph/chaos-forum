package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.ArticleComment;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.service.IArticleCommentService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
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
@Api(value = "文章评论管理器", description = "用于文章评论的基本操作")
public class ArticleCommentController {

    @Autowired
    private IArticleCommentService articleCommentService;

    @Calibrator
    @ApiOperation(value = "创建文章评论")
    @PostMapping("/saveComment")
    public ResultVO saveComment(HttpSession session, ArticleComment articleComment) {
        return this.articleCommentService.saveComment(session, articleComment);
    }

    @ApiOperation(value = "查询文章评论列表")
    @ApiImplicitParam(name = "id", value = "文章ID", required = true, dataType = "int", paramType = "path")
    @GetMapping("/getComment/{id}")
    public ResultVO getComment(@PathVariable int id, ArticleListPage articleListPage) {
        return this.articleCommentService.getComment(id, articleListPage);
    }

    @Calibrator
    @ApiOperation(value = "删除文章评论")
    @ApiImplicitParam(name = "id", value = "文章评论ID", required = true, dataType = "int", paramType = "path")
    @DeleteMapping("/delentComment/{id}")
    public ResultVO delectComment(@PathVariable int id, HttpSession session) {
        return this.articleCommentService.delectComment(id, session);
    }
}