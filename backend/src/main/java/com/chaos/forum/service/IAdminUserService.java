package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.vo.ResultVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * <p>
 * { 用户登陆信息接口 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:36
 */
public interface IAdminUserService extends IService<AdminUser> {

    /**
     * 用户登陆接口
     *
     * @param user 用户实体
     * @param session 状态（用户）
     * */
    ResultVO logIn(AdminUser user, HttpSession session);

    ResultVO selectAll();
}
