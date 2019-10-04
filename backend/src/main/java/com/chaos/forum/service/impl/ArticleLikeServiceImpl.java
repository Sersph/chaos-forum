package com.chaos.forum.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.mapper.ArticleLikeMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleLikeService;
import com.chaos.forum.tools.DatabaseTools;
import com.chaos.forum.vo.ResultVO;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-21 13:41
 */
@Service
public class ArticleLikeServiceImpl extends ServiceImpl<ArticleLikeMapper, ArticleLike> implements IArticleLikeService {


    /**
     * 点赞。状态为1 从mysql中删除一条点赞数据
     * @param  session -> likedUserId 点赞用户id
     * @param articleLike 点赞对象（articleId，state） 点赞的文章ID，点赞的状态 点赞1：取消0
     */
    @Override
    public ResultVO saveLiked(HttpSession session, ArticleLike articleLike) {

        PersonUser userIn = (PersonUser) session.getAttribute("personUser");

        //获取不到用户信息
        if (userIn == null) {
            return new ResultVO(ResultEnum.LI_GIN_NOT);
        }

        articleLike.setVoteTime(DatabaseTools.getSqlDate());
        articleLike.setUserId(userIn.getId());

        System.out.println(session.getAttribute("personUser"));
        System.out.println(articleLike.getId());

        if (this.save(articleLike)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.ERROR);
    }

}