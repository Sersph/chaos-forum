package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.service.IArticleService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
@Api(value = "文章管理器", description = "用于文章的基本操作")
public class ArticleController {

    @Autowired
    IArticleService articleService;

    @ApiOperation(value = "创建文章")
    @Calibrator
    @PostMapping("/sava")
    public ResultVO createArticle(Article article, HttpSession session) {
        return this.articleService.createArticle(article,session);
    }

    @Calibrator
    @ApiOperation(value = "删除文章")
    @ApiImplicitParam(name = "id", value = "文章ID", required = true, dataType = "int", paramType = "path")
    @DeleteMapping("/delete/{id}")
    public ResultVO deleteArticle(@PathVariable int id, HttpSession session) {
        return this.articleService.delectArticle(id, session);
    }

    @ApiOperation(value = "查询单一文章")
    @ApiImplicitParam(name = "id", value = "文章ID", required = true, dataType = "int", paramType = "path")
    @GetMapping("/getOne/{id}")
    public ResultVO selectArticle(@PathVariable int id, ArticleListPage articleListPage) {
        return this.articleService.selectArticle(id, articleListPage);
    }

    @ApiOperation(value = "查询所有文章")
    @GetMapping("/getAll")
    public ResultVO getArticleCategory(ArticleListPage articleListPage) {
        return this.articleService.getArticleCategory(articleListPage);
    }
}
