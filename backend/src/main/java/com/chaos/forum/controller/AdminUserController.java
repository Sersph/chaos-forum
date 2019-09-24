package com.chaos.forum.controller;

import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.AdminUserService;
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
    AdminUserService userService;

    /**
     * 用户登陆
     *
     * @param user 用户实体
     * @param session  用户登陆信息
     */
    @PostMapping("/login")
    public ResultVO logIn(AdminUser user, HttpSession session) {
        return this.userService.logIn(user,session);
    }


    /**
     * 用户登陆退出
     *
     * @param session 用户会话
     * */
    @DeleteMapping("/logOut")
    public ResultVO logOut(HttpSession session) {
        System.out.println(session);
        session.removeAttribute("adminUser");
        return new ResultVO(ResultEnum.SUCCESS);
    }


    /**
     * 用户信息查询
     *
     * @param session 用户登陆信息
     * */
    @GetMapping("/getUserName")
    public ResultVO getUserName(HttpSession session) {
        AdminUser userInfo = (AdminUser) session.getAttribute("adminUser");
        if (userInfo == null) {
            return new ResultVO(ResultEnum.LI_GIN_NOT);
        }
        return new ResultVO(ResultEnum.SUCCESS,userInfo.getName());
    }

}
