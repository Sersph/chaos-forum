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

        articleComment.setUserId(userIn.getId());
        articleComment.setCreateTime(DatabaseTools.getSqlDate());

        if (this.save(articleComment)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.ERROR);
    }
}