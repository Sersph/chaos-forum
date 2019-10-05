package com.chaos.forum.controller;

import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IUserService;
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
@RequestMapping("/frontend/user")
public class UserController {

    @Autowired
    IUserService userService;


    /**
     * 用户注册
     *
     * @param user
     * @return
     */
    @PostMapping("/signIn")
    public ResultVO signIn(PersonUser user) {
        return this.userService.signIn(user);
    }

    /**
     * 用户登陆
     *
     * @param user
     * @return
     */
    @PostMapping("/logIn")
    public ResultVO logIn(PersonUser user, HttpSession session) {
        return this.userService.logIn(user, session);
    }

    /**
     * 用户退出
     *
     * @return
     */
    @GetMapping("/logOut")
    public ResultVO logOut(HttpSession session) {
        session.removeAttribute("user");
        return new ResultVO(ResultEnum.SUCCESS);
    }

    /**
     * 用户修改信息
     *
     * @param user
     * @return
     */
    @PutMapping("/alter")
    public ResultVO alter(PersonUser user) {
        return this.userService.alter(user);
    }

    /**
     * 用户信息查询
     *w
     * @return
     */
    @GetMapping("/userCase")
    public ResultVO getUserName(HttpSession session) {

        PersonUser userIn = (PersonUser) session.getAttribute("personUser");
        if (userIn == null) {
            return new ResultVO(ResultEnum.LI_GIN_NOT);
        }
        return new ResultVO(ResultEnum.SUCCESS,userIn.getUsername());
    }
}
