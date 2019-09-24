package com.chaos.forum.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:33
 */
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
    IPage<Article> selectPages(
            Page<Article> page,
            @Param(Constants.WRAPPER) Wrapper<Article> queryWrapper,
            @Param("articleListPage") ArticleListPage articleListPage
    );
}
