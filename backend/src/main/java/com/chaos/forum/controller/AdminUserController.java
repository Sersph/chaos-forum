package com.chaos.forum.controller;

import com.chaos.forum.decorator.SysdbaCalibrator;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IAdminUserService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


/**
 * <p>
 * { 用户登陆 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:40
 */
@RestController
@RequestMapping("/backend/manager")
public class AdminUserController {

    @Autowired
    IAdminUserService adminUserService;

    /**
     * 管理员用户登陆
     *
     * @param adminUser 用户实体
     * @param session  用户登陆信息
     */
    @PostMapping("/logIn")
    public ResultVO logIn(AdminUser adminUser, HttpSession session) {
        return this.adminUserService.logIn(adminUser,session);
    }


    /**
     * 管理员用户登陆退出
     *
     * @param session 用户会话
     * */
    @SysdbaCalibrator
    @DeleteMapping("/logOut")
    public ResultVO logOut(HttpSession session) {
        session.removeAttribute("adminUser");
        return new ResultVO(ResultEnum.SUCCESS);
    }


    /**
     * 管理员用户信息查询
     *
     * @param session 用户登陆信息
     * */
    @SysdbaCalibrator
    @GetMapping("/getUserName")
    public ResultVO getUserName(HttpSession session) {
        AdminUser userInfo = (AdminUser) session.getAttribute("adminUser");

        if (userInfo == null) {
            return new ResultVO(ResultEnum.LI_GIN_NOT);
        }
        return new ResultVO(ResultEnum.SUCCESS,userInfo.getName());
    }

    /**
     * 获取所有用户列表
     *
     * @return
     */
    @SysdbaCalibrator
    @GetMapping("/selectAll")
    public ResultVO selectAll(ArticleListPage articleListPage) {
        return this.adminUserService.selectAllUser(articleListPage);
    }

    @SysdbaCalibrator
    @GetMapping("/selectAllArticle")
    public ResultVO selectAllArticle(ArticleListPage articleListPage) {
        return this.adminUserService.selectAllArticle(articleListPage);
    }

    @SysdbaCalibrator
    @DeleteMapping("/deleteArticle/{id}")
    public ResultVO deleteArticle(@PathVariable int id) {
        return this.adminUserService.deleteArticle(id);
    }
}
