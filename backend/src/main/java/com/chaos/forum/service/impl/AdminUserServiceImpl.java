package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.AdminUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.AdminUserMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.AdminUserService;
import com.chaos.forum.vo.ResultVO;
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
    public ResultVO logIn(AdminUser user) {


        AdminUser userOne = this.getOne(new QueryWrapper<AdminUser>().eq("name", user.getName()));

        if (userOne == null) {
            throw new DataException(ResultEnum.LIGIN__ERROR);
        }
        if (!userOne.getPassword().equals(user.getPassword())) {
            throw new DataException(ResultEnum.LIGIN__ERROR);
        }
        return new ResultVO(ResultEnum.LIGIN__SUCCESS);
    }

}
