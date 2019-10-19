package com.chaos.forum.controller;

import com.chaos.forum.decorator.Calibrator;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IUserService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
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
@RequestMapping("/frontend/user")
@Api(value = "普通用户管理器", description = "用于普通用户基本操作")
public class UserController {

    @Autowired
    IUserService userService;

    @ApiOperation(value = "普通用户注册")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "用户名", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/register")
    public ResultVO signIn(PersonUser user) {
        return this.userService.signIn(user);
    }

    @ApiOperation(value = "普通用户登陆")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "用户名", required = true, dataType = "String", paramType = "query"),
            @ApiImplicitParam(name = "password", value = "密码", required = true, dataType = "String", paramType = "query")
    })
    @PostMapping("/logIn")
    public ResultVO logIn(PersonUser user, HttpSession session) {
        return this.userService.logIn(user, session);
    }

    @Calibrator
    @ApiOperation(value = "普通用户退出")
    @GetMapping("/logOut")
    public ResultVO logOut(HttpSession session) {
        session.removeAttribute("personUser");
        return new ResultVO(ResultEnum.SUCCESS);
    }

    @Calibrator
    @ApiOperation(value = "用户修改")
    @PutMapping("/alter")
    public ResultVO alter(PersonUser user,HttpSession session) {
        return this.userService.alter(session, user);
    }

    @Calibrator
    @ApiOperation(value = "查询用户详情")
    @GetMapping("/userCase")
    public ResultVO getUserName(HttpSession session) {
        return this.userService.getUserName(session);
    }
}




