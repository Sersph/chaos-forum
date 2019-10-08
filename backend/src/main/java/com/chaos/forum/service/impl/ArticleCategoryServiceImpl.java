package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.ArticleCategory;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.ArticleCategoryMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleCategoryService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.tools.PageTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
public class ArticleCategoryServiceImpl extends ServiceImpl<ArticleCategoryMapper, ArticleCategory> implements IArticleCategoryService {


    @Autowired
    private ArticleCategoryMapper articleCategoryMapper;

    /**
     * 创建文章分类
     *
     * @param articleCategoryName
     * @return
     */
    @Override
    public ResultVO createCategory(ArticleCategory articleCategoryName) {
        if (this.save(articleCategoryName)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.CREATE_ERROR);
    }

    /**
     * 修改文章分类名
     *
     * @param articleCategoryName
     * @return
     */
    @Override
    public ResultVO updateCategory(ArticleCategory articleCategoryName) {
        this.updateById(articleCategoryName);
        UpdateWrapper<ArticleCategory> articleUpdateWrapper = new UpdateWrapper<>();
        articleUpdateWrapper.eq("name", articleCategoryName.getName());
        return new ResultVO(ResultEnum.SUCCESS);
    }

    /**
     * 查询单一文章分类
     *
     * @param articleListPage
     * @return
     */
    @Override
    public ResultVO selectCategory(ArticleListPage articleListPage) {
        PageTools pageTools = new PageTools<ArticleCategory>(articleListPage.getPage(), articleListPage.getPageSize());
        return new ResultVO(ResultEnum.SUCCESS,
                pageTools.autoPaging(articleListPage,
                    (page, wrapper) -> this.articleCategoryMapper.selectPages(page, wrapper)
                ));
    }

    /**
     * 查询所有文章
     *
     * @return
     */
    @Override
    public ResultVO selectArticleAll() {
        if (articleCategoryMapper.selectList(new QueryWrapper<>()) == null) {
            return new ResultVO(ResultEnum.SUCCESS, articleCategoryMapper.selectList( new QueryWrapper<>()));
        }
        throw new DataException(ResultEnum.SELECT_ERROR);
    }
}
