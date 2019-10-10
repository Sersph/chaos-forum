package com.chaos.forum.tools.lambda;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.ArticleListPage;

/**
 * { 定义接收参数接口 }
 *
 * @Author kay
 * @Author hiems
 * 2019-09-23 17:45
 */
public interface PageMapperLambdaBada<T> {
    IPage<T> select(Page<T> page, QueryWrapper<T> wrapper, ArticleListPage articleListPage);
}
