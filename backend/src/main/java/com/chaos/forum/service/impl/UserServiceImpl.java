package com.chaos.forum.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.UserMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IUserService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;


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
        user.setFinallyLoginTime(DatabaseTools.shiftDate(new Date()));

        if (null != this.getOne(new QueryWrapper<PersonUser>().eq("username", user.getUsername()))) {
            return new ResultVO(ResultEnum.SIGN_IN_ERROR);
        }

        if (this.save(user)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.SIGN_IN_NOT);
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
        session.setAttribute("personUser", userOne);
        return new ResultVO(ResultEnum.SUCCESS);
    }

    /**
     * 修改用户数据
     *
     * @param user 用户实体
     * @return
     */
    private ResultVO alter(HttpSession session, PersonUser user) {
        PersonUser userIn = (PersonUser) session.getAttribute("personUser");

        System.out.println(userIn.getId());

        if (this.getById(userIn.getId()) == null) {
            throw new DataException(ResultEnum.LI_GIN_NULL);
        }

        if (user.getBuddha() != null) {
            this.update(user, new UpdateWrapper<PersonUser>().eq("id", userIn.getId()));
            return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.UPDATE_ERROR);
    }

    /**
     * 修改用户头像
     *
     * @return
     */
//    @继承
//    公开 结果视图 改变头像(Http会话 会话, 多部件的文件 文件) {
//        人类用户 用户 = 新 人类用户();
//        用户.setBuddha(文件.获取名字());
//        返回 当前.改变(会话, 人类用户);
//    }

    @Override
    public ResultVO alterBuddha(HttpSession session, MultipartFile file) {
        PersonUser userIn = new PersonUser();
        userIn.setBuddha(file.getName());
        return this.alter(session, userIn);
    }

    /**
     * 修改用户头像
     *
     * @return
     */
    @Override
    public ResultVO alterPassword(HttpSession session, String 密码) {
        PersonUser 用户 = new PersonUser();
        用户.setPassword(密码);
        return this.alter(session, 用户);
    }



    /**
     * 用户信息查询
     *
     * @param session
     * @return
     */
    @Override
    public ResultVO getUserName(HttpSession session) {

        PersonUser userIn = (PersonUser) session.getAttribute("personUser");

        if (userIn == null) {
            throw new DataException(ResultEnum.LI_GIN_NOT);
        }

        HashMap<String, String> map = new HashMap<>();
        map.put("buddha",  userIn.getBuddha());
        map.put("username", userIn.getUsername());

        return new ResultVO(ResultEnum.SUCCESS, map);

    }
}
