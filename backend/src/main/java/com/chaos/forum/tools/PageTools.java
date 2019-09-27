package com.chaos.forum.tools;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.tools.lambda.PageMapperLambda;

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

    /**
     * 自动分页工具方法
     *
     * 自动判读是否要进行模糊查询，排序以及排序方式
     *
     * @param articleListPage
     * @param pageMapperLambda
     * @return IPage<T>
     */
    public IPage<T> autoPaging(ArticleListPage articleListPage, PageMapperLambda<T> pageMapperLambda) {

        if (articleListPage.getName() != null) {
            this.like("name", articleListPage.getName());
        }

        if (articleListPage.getSortField() != null) {
            this.sort(DatabaseTools.humpIsUnderlined(articleListPage.getSortField()),
                    articleListPage.getSortOrder().equals("desc") ? SortType.DESC : SortType.ASD);
        }

        return this.result(pageMapperLambda);
    }

    /**
     * 分页
     *
     * @param page 页码
     * @param pageSize 条数
     * */
    public PageTools(int page, int pageSize) {
        this.page = new Page<>(page, pageSize);
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

    /**
     * 返回
     *
     * @param pageMapperLambda 注入mapper查询方法
     * @return Page<T> page 分页对象
     * */
    public IPage<T> result(PageMapperLambda<T> pageMapperLambda) {
        return pageMapperLambda.select(this.page, this.wrapper);
    }
}
