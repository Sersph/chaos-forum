package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleComment;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleService;
import com.chaos.forum.vo.ResultVO;
import org.apache.ibatis.annotations.Param;
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
public class ArticleController {

    @Autowired
    IArticleService articleService;

    /**
     * 创建文章
     *
     * @param article 文章实体
     * @return SUCCESS / CREATE_ERROR
     * */
    @Calibrator
    @PostMapping("/sava")
    public ResultVO createArticle(Article article, HttpSession session) {
        return this.articleService.createArticle(article,session);
    }

    /**
     * 删除文章
     *
     * @param id 删除文章的对应ID
     * @return SUCCESS / DELETE_ERROR
     * */
    @Calibrator
    @DeleteMapping("/delete/{id}")
    public ResultVO deleteArticle(@PathVariable int id) {
        if (articleService.removeById(id)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE_ERROR);
    }

    /**
     * 查询单一文章
     * @param id 查询文章的对应ID
     * @return SUCCESS,Date / SELECT_ERROR
     * */
    @GetMapping("/getOne/{id}")
    public ResultVO selectArticle(@PathVariable int id, ArticleListPage articleListPage) {
        return this.articleService.selectArticle(id, articleListPage);
    }

    /**
     * 查询所有文章
     *
     * @return SUCCESS,Date / SELECT_ERROR
     * */
    @GetMapping("/getAll")
    public ResultVO getArticleCategory(ArticleListPage articleListPage) {
        return this.articleService.getArticleCategory(articleListPage);
    }

}
