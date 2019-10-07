package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.vo.ResultVO;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:36
 */
public interface IArticleService extends IService<Article> {

    ResultVO createArticle(Article article, HttpSession session);

    ResultVO updateArticle(Article article);

    ResultVO selectArticle(int id);

    @Deprecated
    ResultVO selectArticle(ArticleListPage articleListPage);

    ResultVO paging(ArticleListPage articleListPage);



}
