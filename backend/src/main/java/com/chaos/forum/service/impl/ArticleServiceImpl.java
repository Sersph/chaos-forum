package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.*;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.ArticleMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.tools.PageTools;
import com.chaos.forum.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;


/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-21 13:41
 */
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements IArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    /**
     * 日志
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 添加文章
     *
     * @param article 实体对象
     */
    @Override
    public ResultVO createArticle(Article article, HttpSession session) {
        PersonUser user = (PersonUser) session.getAttribute("personUser");
        //获取到用户ID
        if (user != null) {
            article.setCreatorId(user.getId());
            /**  插入  */
            if (this.save(article)) {
                return new ResultVO(ResultEnum.SUCCESS);
            }
            throw new DataException(ResultEnum.CREATE_ERROR);
        }
        throw new DataException(ResultEnum.LI_GIN_NOT);
    }

    /**
     * 查询单一文章
     *
     * @param id 查询文章的对应ID
     * @return SUCCESS, Date / SELECT_ERROR
     */
    @Override
    public ResultVO selectArticle(int id) {
        if (this.getById(id) != null) {
            return new ResultVO(ResultEnum.SUCCESS, getById(id));
        }
        throw new DataException(ResultEnum.SELECT_ERROR);
    }

    /**
     * 查询文章列表
     *
     * @return SUCCESS, Date / SELECT_ERROR
     */
    @Override
    public ResultVO getArticleCategory(Article article, ArticleListPage articleListPage, ArticleComment articleComment) {

        /** 分页 */
        Page page = new Page<Article>(articleListPage.getPage(), articleListPage.getPageSize());

        /** 排序 */
        if (articleListPage.getSortField() != null) {
            //转换
            articleListPage.setSortField(DatabaseTools.humpIsUnderlined(articleListPage.getSortField()));
            this.logger.info(articleListPage.getSortField());
            //排序
            if (articleListPage.getSortOrder().equals("desc")) {
                page.setDesc(articleListPage.getSortField());
            } else {
                page.setAsc(articleListPage.getSortField());
            }
        }

        QueryWrapper<Article> wrapper = new QueryWrapper();
        /** 模糊查询 */
        if (articleListPage.getTitle() != null) {
            wrapper.like("title", articleListPage.getTitle());
        }

        /**
         * 通过分类id来判断 查询的方式
         *      分类id ！= 0 就使用分类id来查询文章
         *      则：查询所有文章（可以实现模糊查询）
         */

        if (article.getArticleCategoryId() != 0) {
            List<Article> list = this.list(wrapper.eq("article_category_id", article.getArticleCategoryId()));
            if (list != null) {
                //评论总数：

                //最后得评论人

                IPage iPage = articleMapper.selectPages(page, wrapper, articleListPage);

                return new ResultVO(ResultEnum.SUCCESS, iPage);
            }
            throw new DataException(ResultEnum.SELECT_ERROR);
        } else {
            /**
             * 查询所有文章：模糊查询、默认desc排序；
             */
            if (this.list(new QueryWrapper<>()) != null) {
                if (articleListPage.getArticleCategoryId() != 0) {
                    wrapper.eq("article_category_id", articleListPage.getArticleCategoryId());
                }
                IPage iPage = articleMapper.selectPages(page, wrapper, articleListPage);
                return new ResultVO(ResultEnum.SUCCESS, iPage);
            }
            throw new DataException(ResultEnum.SELECT_ERROR);
        }
    }

    /**
     * 文章分页
     * 废弃
     */
    @Override
    @Deprecated
    public ResultVO selectArticle(ArticleListPage articleListPage) {
//        /** 分页 */
//        Page page = new Page<Article>(articleListPage.getPage(), articleListPage.getPageSize());
//
//        if (articleListPage.getSortField() != null) {
//
//            //转换
//            articleListPage.setSortField(DatabaseTools.humpIsUnderlined(articleListPage.getSortField()));
//
//            this.logger.info(articleListPage.getSortField());
//
//            //排序
//            if (articleListPage.getSortOrder().equals("desc")) {
//                page.setDesc(articleListPage.getSortField());
//            } else {
//                page.setAsc(articleListPage.getSortField());
//            }
//        }
//
//        /** 模糊查询 */
//        QueryWrapper<Article> wrapper = new QueryWrapper();
//        if (articleListPage.getTitle() != null) {
//            wrapper.like("title", articleListPage.getTitle());
//        }
//
//        if (articleListPage.getArticleCategoryId() != 0) {
//            wrapper.eq("article_category_id", articleListPage.getArticleCategoryId());
//        }
//
//        IPage iPage = articleMapper.selectPages(page, wrapper, articleListPage);
//        return new ResultVO(ResultEnum.SUCCESS, iPage);
//    }
        return null;
    }
}
