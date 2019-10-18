package com.chaos.forum.controller;

import com.chaos.forum.decorator.SysdbaCalibrator;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IAdminUserService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;


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
@Api(value = "管理员接口", description = "后端管理员基本操作")
public class AdminUserController {

    @Autowired
    IAdminUserService adminUserService;

    @ApiOperation(value = "管理员登陆")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "用户名", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/logIn")
    public ResultVO logIn(@Valid AdminUser adminUser, HttpSession session) {
        return this.adminUserService.logIn(adminUser,session);
    }

    @SysdbaCalibrator
    @ApiOperation(value = "管理员退出")
    @DeleteMapping("/logOut")
    public ResultVO logOut(HttpSession session) {
        session.removeAttribute("adminUser");
        return new ResultVO(ResultEnum.SUCCESS);
    }

    @SysdbaCalibrator
    @ApiOperation(value = "查询管理员登陆信息")
    @GetMapping("/getUserName")
    public ResultVO getUserName(HttpSession session) {
        AdminUser userInfo = (AdminUser) session.getAttribute("adminUser");
        if (userInfo == null) {
            return new ResultVO(ResultEnum.LI_GIN_NOT);
        }
        return new ResultVO(ResultEnum.SUCCESS,userInfo.getName());
    }

    @SysdbaCalibrator
    @ApiOperation(value = "获取所有用户列表")
    @GetMapping("/selectAll")
    public ResultVO selectAll(ArticleListPage articleListPage) {
        return this.adminUserService.selectAllUser(articleListPage);
    }

    @SysdbaCalibrator
    @ApiOperation(value = "查询所有文章")
    @GetMapping("/selectAllArticle")
    public ResultVO selectAllArticle(ArticleListPage articleListPage) {
        return this.adminUserService.selectAllArticle(articleListPage);
    }

    @SysdbaCalibrator
    @ApiOperation(value = "删除文章", notes = "通过接收文章ID删除文章")
    @ApiImplicitParam(name = "id", value = "文章ID", required = true,dataType = "int",paramType = "path")
    @DeleteMapping("/deleteArticle/{id}")
    public ResultVO deleteArticle(@PathVariable int id) {
        return this.adminUserService.deleteArticle(id);
    }
}
