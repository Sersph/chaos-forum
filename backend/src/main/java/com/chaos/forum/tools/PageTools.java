package com.chaos.forum.tools;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.tools.lambda.PageMapperLambda;
import com.chaos.forum.tools.lambda.PageMapperLambdaBada;
import com.chaos.forum.tools.lambda.PageMapperLambdaOne;

/**
 * { mybatis-plus 分页工具类}
 *
 * @Author kay
 * @Author hiems
 * 2019-09-23 16:29
 */
public class PageTools<T> {

    private Page<T> page;

    private QueryWrapper<T> wrapper = new QueryWrapper<>();

    private ArticleListPage articleListPage = null;


    /**
     * 自动分页工具方法
     *
     * 自动判读是否要进行模糊查询，排序以及排序方式
     *
     * @return IPage<T>
     */
    public PageTools<T> autoPaging() {

        if (this.articleListPage.getName() != null) {
            this.like("name", this.articleListPage.getName());
        }

        if (this.articleListPage.getTitle() != null) {
            this.like("title", this.articleListPage.getTitle());
        }

        if (this.articleListPage.getSortField() != null) {
            this.sort(DatabaseTools.humpIsUnderlined(this.articleListPage.getSortField()),
                    this.articleListPage.getSortOrder().equals("desc") ? SortType.DESC : SortType.ASD);
        }

        if (this.articleListPage.getArticleCategoryId() != null) {
            this.category(this.articleListPage.getArticleCategoryId());
        }

        if (this.articleListPage.getArticleId() != null) {
            this.article(this.articleListPage.getArticleId());
        }

        return this;
    }

    /**
     * 分页
     *
     * */
    public PageTools(ArticleListPage articleListPage) {
        this.articleListPage = articleListPage;
        this.page = new Page<>(this.articleListPage.getPage(), this.articleListPage.getPageSize());
    }


    /**
     *模糊查询
     *
     * @param column 键-需要查询的字段
     * @param value 值-需要查询的数据
     * @return PageTools
     * */
    public PageTools<T> like(String column, String value) {
        this.wrapper.like(column, value);
        return this;
    }

    /**
     * 排序
     *
     * @param sortField 排序的目标
     * @param sortType 排序的值-desc/asd
     * @return PageTools
     * */
    public PageTools<T> sort(String sortField, SortType sortType) {
        if (sortType.equals(SortType.ASD)) {
            this.page.setAsc(sortField);
        } else {
            this.page.setDesc(sortField);
        }
        return this;
    }

    public PageTools<T> category(Integer categoryId) {
        this.wrapper.eq("article_category_id", categoryId);
        return this;
    }

    public PageTools<T> article(Integer articleId) {
        this.wrapper.eq("article_id", articleId);
        return this;
    }

    /**
     * 返回
     *
     * @param pageMapperLambda 注入mapper查询方法
     * @return Page<T> page 分页对象
     * */
    public IPage<T> result(PageMapperLambda<T> pageMapperLambda) {
        return pageMapperLambda.select(this.page, this.wrapper);
    }

    public IPage<T> result(PageMapperLambdaOne<T> pageMapperLambda) {
        return pageMapperLambda.select(this.page);
    }

    public IPage<T> result(PageMapperLambdaBada<T> pageMapperLambda) {
        return pageMapperLambda.select(this.page, this.wrapper, this.articleListPage);
    }

}
