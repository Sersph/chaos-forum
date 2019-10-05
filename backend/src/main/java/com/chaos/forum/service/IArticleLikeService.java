package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.ArticleLike;
import com.chaos.forum.vo.ResultVO;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-04 16:48
 */
public interface IArticleLikeService extends IService<ArticleLike> {

    /**
     * 点赞状态 从mysql中删除一条点赞数据
     * @param  session -> likedUserId 点赞用户id
     * @param articleLike 点赞对象（articleId，state） 点赞的文章ID，点赞的状态 点赞1：取消0
     */
    ResultVO saveLiked(HttpSession session, ArticleLike articleLike);

}
