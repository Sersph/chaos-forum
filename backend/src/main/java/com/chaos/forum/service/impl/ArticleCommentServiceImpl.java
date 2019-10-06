package com.chaos.forum.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.chaos.forum.entity.ArticleComment;
import com.chaos.forum.entity.PersonUser;
import com.chaos.forum.mapper.ArticleCommentMapper;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleCommentService;
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
public class ArticleCommentServiceImpl extends ServiceImpl<ArticleCommentMapper, ArticleComment> implements IArticleCommentService {

    /**
     * 创建文章评论
     *
     * @param session
     * @param articleComment
     * @return
     */
    @Override
    public ResultVO SaveComment(HttpSession session, ArticleComment articleComment) {

        PersonUser userIn = (PersonUser) session.getAttribute("personUser");

        //获取到用户ID
        articleComment.setUserId(userIn.getId());
        //获取到创建时间
        articleComment.setCreateTime(DatabaseTools.getSqlDate());

        /**
         * 传入评论内容，文章ID，被回复人ID可以为null（null的话 就是评论的第一条）
         */
        if (this.save(articleComment)){
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.ERROR);
    }

    /**
     * 文章评论回复功能
     *
     * @param session
     * @param articleComment
     * @return
     */
    @Override
    public ResultVO replyComment(HttpSession session, ArticleComment articleComment) {



        return null;
    }
}