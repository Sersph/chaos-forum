package com.chaos.forum.controller;

import com.chaos.forum.entity.Article;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.ArticleService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * { describe }
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

    @ResponseBody
    @PostMapping("/article")
    public ResultVO createArticle(Article article) {
        return this.articleService.createArticle(article);
    }


    @ResponseBody
    @GetMapping("/article/{id}")
    public ResultVO updateArticle(Article article, @PathVariable int id) {
        article.setId(id);
        return this.articleService.updateArticle(article);
    }

    @ResponseBody
    @DeleteMapping("/article/{id}")
    public ResultVO deleteArticle(@PathVariable int id) {
        if (articleService.removeById(id)) {
            return new ResultVO(ResultEnum.CREATE__SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE__ERROR);
    }

    @ResponseBody
    @GetMapping("article")
    public ResultVO selectArticle() {
        return null;
    }
}
