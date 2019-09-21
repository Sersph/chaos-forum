package com.chaos.forum.controller;

import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.service.AdminUserService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:40
 */
@RestController
@RequestMapping("/manager")
public class AdminUserController {

    @Autowired
    AdminUserService userService;

    @ResponseBody
    @PostMapping("/login")
    public ResultVO logIn(AdminUser user) {
        return this.userService.logIn(user);
    }
}
