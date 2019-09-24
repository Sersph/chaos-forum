package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.mapper.ArticleMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.ArticleService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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

        article.setCreateTime(DatabaseTools.getSqlDate());
        article.setUpdateTime(DatabaseTools.getSqlDate());

        if (this.save(article)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE_ERROR);
    }

    @Override
    public ResultVO updateArticle(Article article) {

        this.updateById(article);

        UpdateWrapper<Article> articleUpdateWrapper = new UpdateWrapper<>();
        articleUpdateWrapper.eq("title", article.getTitle())
                .ne("content", article.getContent())
                    .ne("article_category_id", article.getArticleCategoryId());

        return new ResultVO(ResultEnum.SUCCESS);
    }

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 文章分页
     *
     * */
    @Override
    public ResultVO selectArticle(ArticleListPage articleListPage) {

        /** 分页 */
        Page page = new Page<Article>(articleListPage.getPage(), articleListPage.getPageSize());

        if (articleListPage.getSortField() != null) {

            //转换
            articleListPage.setSortField(DatabaseTools.humpIsUnderlined(articleListPage.getSortField()));
            this.logger.info(articleListPage.getSortField());

            //排序
            if (articleListPage.getSortOrder().equals("desc")) {
                page.setDesc(articleListPage.getSortField());
            } else {
                page.setAsc(articleListPage.getSortField());
            }
        }

        /** 模糊查询 */
        QueryWrapper<Article> wrapper = new QueryWrapper();

        if (articleListPage.getTitle() != null) {
            wrapper.like("title", articleListPage.getTitle());
        }
        IPage iPage = articleMapper.selectPages(page, wrapper);
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

}
