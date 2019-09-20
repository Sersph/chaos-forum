package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.AdminUser;
import org.springframework.stereotype.Repository;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:36
 */
public interface AdminUserService extends IService<AdminUser> {

    boolean logIn(AdminUser user);
}
