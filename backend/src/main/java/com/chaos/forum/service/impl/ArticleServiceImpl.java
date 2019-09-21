package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.segments.MergeSegments;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.Article;
import com.chaos.forum.mapper.ArticleMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.ArticleService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-21 13:41
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public ResultVO createArticle(Article article) {

        Date date = new Date();

        article.setCreateTime(new java.sql.Date(date.getTime()));
        article.setUpdateTime(new java.sql.Date(date.getTime()));

        int a = articleMapper.insert(article);
        if (a == 1) {
            return new ResultVO(ResultEnum.CREATE__SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE__ERROR);
    }

    @Override
    public ResultVO updateArticle(Article article) {

        articleMapper.updateById(article);

        UpdateWrapper<Article> articleUpdateWrapper = new UpdateWrapper<>();

        articleUpdateWrapper.eq("title", article.getTitle())
                .ne("content", article.getContent())
                .ne("article_category_id", article.getArticleCategoryId());

        return new ResultVO(ResultEnum.UPDATE__SUCCESS);
    }
}
