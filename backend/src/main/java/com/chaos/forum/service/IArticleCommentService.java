package com.chaos.forum.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.chaos.forum.entity.ArticleComment;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.vo.ResultVO;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-05 20:15
 */
public interface IArticleCommentService extends IService<ArticleComment> {

    ResultVO SaveComment(HttpSession session, ArticleComment articleComment);

    ResultVO getComment(int id, ArticleListPage articleListPage);

}
