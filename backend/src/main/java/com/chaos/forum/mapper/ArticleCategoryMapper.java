package com.chaos.forum.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.ArticleCategory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-23 14:44
 */
@Mapper
public interface ArticleCategoryMapper extends BaseMapper<ArticleCategory> {


    /**
     * 分页
     * */
    IPage<ArticleCategory> selectPages(Page<ArticleCategory> page, @Param(Constants.WRAPPER) Wrapper<ArticleCategory> queryWrapper);


}

