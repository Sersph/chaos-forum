package com.chaos.forum.controller;

import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.ArticleService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * { 文章管理器 }
 * </p>
 *
 * @Author kay
 * 2019-09-21 13:45
 */
@RequestMapping("/backend")
@RestController
public class ArticleController {

    @Autowired
    ArticleService articleService;

    /**
     * 创建文章
     *
     * @param article 文章实体
     * @return SUCCESS / CREATE_ERROR
     * */
    @PostMapping("/article")
    public ResultVO createArticle(Article article) {
        return this.articleService.createArticle(article);
    }

    /**
     * 修改文章
     *
     * @param article 文章实体
     * @param id 修改文章的对应ID
     * @return SUCCESS / UPDATE_ERROR
     * */
    @PutMapping("/article/{id}")
    public ResultVO updateArticle(Article article, @PathVariable int id) {
        article.setId(id);
        return this.articleService.updateArticle(article);
    }

    /**
     * 删除文章
     *
     * @param id 删除文章的对应ID
     * @return SUCCESS / DELETE_ERROR
     * */
    @DeleteMapping("/article/{id}")
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
    @GetMapping("/article/{id}")
    public ResultVO selectArticle(@PathVariable int id) {
        if (articleService.getById(id) != null) {
            return new ResultVO(ResultEnum.SUCCESS, articleService.getById(id));
        }
        return new ResultVO(ResultEnum.LI_GIN_PAST);
    }


    /**
     * 文章查询-分页
     *
     * @param articleListPage 分页实体
     * @return SUCCESS ,iPage /  LI_GIN_PAST
     */
    @GetMapping("article")
    public ResultVO selectArticle(ArticleListPage articleListPage) {
        return this.articleService.paging(articleListPage);
    }

}
