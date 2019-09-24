package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.ArticleCategory;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.vo.ResultVO;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-23 14:46
 */
public interface ArticleCategorySercvice extends IService<ArticleCategory> {

    ResultVO createCategory(ArticleCategory articleCategoryName);

    ResultVO updateCategory(ArticleCategory articleCategoryName);

    ResultVO selectCategory(ArticleListPage articleListPage);

    ResultVO selectArticleAll();

}
