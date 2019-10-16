package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.ArticleMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.tools.PageTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
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
     * 添加文章
     *
     * @param article 实体对象
     */
    @Override
    public ResultVO createArticle(Article article, HttpSession session) {
        PersonUser user = (PersonUser) session.getAttribute("personUser");
        //获取到用户ID
        article.setCreatorId(user.getId());
        /**  插入  */
        if (this.save(article)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.CREATE_ERROR);
    }

    /**
     * 获取文章单一列表
     *
     * @param id 文章id
     * @param articleListPage
     * @return
     */
    @Cacheable(value = "ResultVO")
    @Override
    public ResultVO selectArticle(int id, ArticleListPage articleListPage) {
        PageTools<Article> pageTools = new PageTools<>(articleListPage);
        IPage<Article> iPage = pageTools.autoPaging()
                .result((page, wrapper, articleListPage1)
                        -> this.articleMapper.selectOne(page, wrapper, articleListPage1, id));
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

    /**
     * 查询文章列表
     *
     * @return SUCCESS, Date / SELECT_ERROR
     */
    @Cacheable(value = "ResultVO")
    @Override
    public ResultVO getArticleCategory(ArticleListPage articleListPage) {
        /** 分页 */
        PageTools<Article> pageTools = new PageTools<>(articleListPage);
        IPage<Article> iPage = pageTools.autoPaging()
                .result((page, wrapper, articleListPage1)
                        -> this.articleMapper.selectPages(page, wrapper, articleListPage1));
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

    /**
     * 删除文章
     *
     * @param id
     * @param session
     * @return
     */
    @Override
    public ResultVO delectArticle(int id, HttpSession session) {

        PersonUser userIn = (PersonUser) session.getAttribute("personUser");
        List list = this.list(new QueryWrapper<Article>().eq("creator_id", userIn.getId()));
        if (list != null) {
            this.removeById(id);
            return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.DELETE_ERROR);
    }

    /**
     * 文章分页
     * 废弃
     */
    @Override
    @Deprecated
    public ResultVO selectArticle(ArticleListPage articleListPage) {
        /** 分页 */
        Page page = new Page<Article>(articleListPage.getPage(), articleListPage.getPageSize());

        if (articleListPage.getSortField() != null) {

            //转换
            articleListPage.setSortField(DatabaseTools.humpIsUnderlined(articleListPage.getSortField()));

            //排序
            if (articleListPage.getSortOrder().equals("desc")) {
                page.setDesc(articleListPage.getSortField());
            } else {
                page.setAsc(articleListPage.getSortField());
            }
        }

        /** 模糊查询 */
        QueryWrapper<Article> wrapper = new QueryWrapper();
        if (articleListPage.getTitle() != null) {
            wrapper.like("title", articleListPage.getTitle());
        }

        if (articleListPage.getArticleCategoryId() != 0) {
            wrapper.eq("article_category_id", articleListPage.getArticleCategoryId());
        }

        IPage iPage = articleMapper.selectPages(page, wrapper, articleListPage);
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

}
