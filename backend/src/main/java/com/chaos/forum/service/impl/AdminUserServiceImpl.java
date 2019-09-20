package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.mapper.AdminUserMapper;
import com.chaos.forum.service.AdminUserService;
import com.chaos.forum.vo.FourmVO;
import org.springframework.stereotype.Service;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:38
 */
@Service
public class AdminUserServiceImpl extends ServiceImpl<AdminUserMapper, AdminUser> implements AdminUserService {

    @Override
    public boolean logIn(AdminUser user) {
        AdminUser userOne = this.getOne(new QueryWrapper<AdminUser>().eq("name", user.getName()));
        if (userOne == null) {
            throw new RuntimeException("user is not fond");

        }
        if (!userOne.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("密码不正确");
        }
        return true;
    }
}
