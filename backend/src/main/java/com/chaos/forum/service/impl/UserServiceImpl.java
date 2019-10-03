package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.UserMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IUserService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;


/**
 * <p>
 * { 用户登陆服务层 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:38
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, PersonUser> implements IUserService {


    /**
     * 用户注册
     *
     * @param user
     * @return
     */
    @Override
    public ResultVO signIn(PersonUser user) {
        user.setCreateTime(DatabaseTools.getSqlDate());
        user.setUpdateTime(DatabaseTools.getSqlDate());
        user.setFinallyLoginTime(DatabaseTools.getSqlDate());

        if (this.save(user)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.SIGN_IN_NOT);
    }

    /**
     * 用户登陆
     *
     * @param user 用户实体
     * @param session
     * @return
     */
    @Override
    public ResultVO logIn(PersonUser user, HttpSession session) {

        PersonUser userOne = this.getOne(new QueryWrapper<PersonUser>().eq("username", user.getUsername()));
        /** 判断数据库记录
         *      抛出异常：LI_GIN_NULL（用户未注册）
         * */
        if (userOne == null) {
            throw new DataException(ResultEnum.LI_GIN_NULL);
        }

        /** 判断用户名密码是否一致
         *      抛出异常：LI_GIN_ERROR（用户名或密码不正确）
         * */
        if (!userOne.getPassword().equals(user.getPassword())) {
            throw new DataException(ResultEnum.LI_GIN_ERROR);
        }


        /** 保存用户登陆信息 */
        session.setAttribute("adminUser", userOne);
        return new ResultVO(ResultEnum.SUCCESS);
    }

    /**
     * 修改用户密码
     *
     * @param user 用户实体
     * @return
     */
    @Override
    public ResultVO alter(PersonUser user) {

        PersonUser userOne = this.getOne(new QueryWrapper<PersonUser>().eq("username", user.getUsername()));
        if (userOne == null) {
            throw new DataException(ResultEnum.LI_GIN_NULL);
        }

        if (this.update(user,new QueryWrapper<PersonUser>().eq("username", user.getUsername()))){
            return new ResultVO(ResultEnum.SUCCESS);
        }

        throw new DataException(ResultEnum.UPDATE_ERROR);
    }
}
