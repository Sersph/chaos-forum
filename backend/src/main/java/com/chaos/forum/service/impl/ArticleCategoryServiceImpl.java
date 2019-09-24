package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.ArticleCategory;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.mapper.ArticleCategoryMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.ArticleCategorySercvice;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.tools.PageTools;
import com.chaos.forum.tools.SortType;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-23 14:46
 */
@Service
public class ArticleCategoryServiceImpl extends ServiceImpl<ArticleCategoryMapper, ArticleCategory> implements ArticleCategorySercvice {


    @Autowired
    private ArticleCategoryMapper articleCategoryMapper;

    @Override
    public ResultVO createCategory(ArticleCategory articleCategoryName) {

        articleCategoryName.setCreateTime(DatabaseTools.getSqlDate());
        articleCategoryName.setUpdateTime(DatabaseTools.getSqlDate());

        if (this.save(articleCategoryName)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE_ERROR);
    }

    @Override
    public ResultVO updateCategory(ArticleCategory articleCategoryName) {

        this.updateById(articleCategoryName);

        UpdateWrapper<ArticleCategory> articleUpdateWrapper = new UpdateWrapper<>();
        articleUpdateWrapper.eq("name", articleCategoryName.getName());

        return new ResultVO(ResultEnum.SUCCESS);
    }

    @Override
    public ResultVO selectCategory(ArticleListPage articleListPage) {
        IPage iPage = new PageTools<ArticleCategory>(articleListPage.getPage(), articleListPage.getPageSize())
                .like("title", articleListPage.getTitle())
                .sort(articleListPage.getSortField(), articleListPage.getSortOrder() == "desc" ? SortType.DESC : SortType.ASD)
                .result(((page, wrapper) -> this.articleCategoryMapper.selectPages(page, wrapper)));

        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }
}
