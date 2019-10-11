package com.chaos.forum.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.entity.ArticleComment;
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
public interface ArticleCommentMapper extends BaseMapper<ArticleComment> { }
