package com.chaos.forum.tools.lambda;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-16 14:11
 */
public interface PageMapperLambdaOne<T> {
    IPage<T> select(Page<T> page);
}
