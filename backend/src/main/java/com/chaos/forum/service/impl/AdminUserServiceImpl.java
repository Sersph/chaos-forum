package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.entity.Article;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.AdminUserMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IAdminUserService;
import com.chaos.forum.service.IArticleService;
import com.chaos.forum.service.IUserService;
import com.chaos.forum.tools.PageTools;
import com.chaos.forum.vo.ResultVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;


/**
 * <p>
 * { 管理员用户服务层 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:38
 */
@Service
public class AdminUserServiceImpl extends ServiceImpl<AdminUserMapper, AdminUser> implements IAdminUserService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IArticleService articleService;

    /**
     * 管理员用户登陆
     *
     * @param adminUser    用户对象
     * @param session 用户情况（登陆情况）
     */
    @Override
    public ResultVO logIn(AdminUser adminUser, HttpSession session) {
        AdminUser adminUserOne = this.getOne(new QueryWrapper<AdminUser>().eq("name", adminUser.getName()));
        this.logger.info("in logIn");
        /** 判断数据库记录
         *      抛出异常：LI_GIN_NULL（用户未注册）
         * */
        if (adminUserOne == null) {
            this.logger.info("throw DataException LI_GIN_NULL");
            throw new DataException(ResultEnum.LI_GIN_NULL);
        }

        /** 判断用户名密码是否一致
         *      抛出异常：LI_GIN_ERROR（用户名或密码不正确）
         * */
        if (!adminUserOne.getPassword().equals(adminUser.getPassword())) {
            this.logger.info("throw DataException LI_GIN_ERROR");
            throw new DataException(ResultEnum.LI_GIN_ERROR);
        }


        /** 保存用户登陆信息 */
        session.setAttribute("adminUser", adminUserOne);
        this.logger.info("login SUCCESS");
        return new ResultVO(ResultEnum.SUCCESS);
    }

    /**
     * 查询所用用户列表
     *
     * @return
     */
    @Override
    public ResultVO selectAllUser(ArticleListPage articleListPage) {
        PageTools<PersonUser> pageTools = new PageTools<>(articleListPage);
        IPage<PersonUser> iPage = pageTools.autoPaging()
                .result((this::selectUser));
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

    @Override
    public ResultVO selectAllArticle(ArticleListPage articleListPage) {
        PageTools<Article> pageTools = new PageTools<>(articleListPage);
        IPage<Article> iPage = pageTools.autoPaging()
                .result((this::selectArticle));
        return new ResultVO(ResultEnum.SUCCESS, iPage);
    }

    @Override
    public ResultVO deleteArticle(int id) {
        if (this.articleService.removeById(id)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.DELETE_ERROR);
    }


    private IPage<PersonUser> selectUser(Page<PersonUser> page) {
        return this.iUserService.page(page);
    }

    private IPage<Article> selectArticle(Page<Article> page) {
        return this.articleService.page(page);
    }

}
