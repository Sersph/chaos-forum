package com.chaos.forum.tools.lambda;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-23 17:45
 */
public interface PageMapperLambda<T> {
    IPage select(Page<T> page, QueryWrapper<T> wrapper);
}
