package com.chaos.forum.service.impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.exception.DataException;
import com.chaos.forum.mapper.ArticleLikeMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleLikeService;
import com.chaos.forum.vo.ResultVO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * { 点赞 }
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
        articleLike.setUserId(userIn.getId());
        articleLike.setVoteTime(new Date());
        /**
         * 判断数据库有没有记录：
         *      有记录的直接更新状态
         *      没记录的就插入一条记录
         */
        if (null == this.getOne(new QueryWrapper<ArticleLike>()
                .eq("user_id", articleLike.getUserId())
                .eq("article_id", articleLike.getArticleId()))){
            if (this.save(articleLike)) {
                return new ResultVO(ResultEnum.SUCCESS);
            }
        }
        if (this.update(articleLike, new UpdateWrapper<ArticleLike>()
                    .eq("user_id",articleLike.getUserId())
                    .eq("article_id",articleLike.getArticleId()))){
               return new ResultVO(ResultEnum.SUCCESS);
        }
        throw new DataException(ResultEnum.ERROR);
    }

    /**
     * 获取用户点赞的文章
     *
     * @param session
     * @param articleLike
     * @return
     */
    @Cacheable(value = "selectArticleLike")
    @Override
    public ResultVO selectLikeAllUser(HttpSession session, ArticleLike articleLike) {
        PersonUser userIn = (PersonUser) session.getAttribute("personUser");
        articleLike.setUserId(userIn.getId());
         List<ArticleLike> list = this.list(new QueryWrapper<ArticleLike>()
                 .eq("user_id",userIn.getId()).eq("status",1));
        if (list == null) {
            throw new DataException(ResultEnum.SELECT_ERROR);
        }

        ArrayList<Integer> articleIdList = new ArrayList<>();
        for(ArticleLike obj : list){
            articleIdList.add(obj.getArticleId());
        }

        return new ResultVO(ResultEnum.SUCCESS, articleIdList);
    }


}