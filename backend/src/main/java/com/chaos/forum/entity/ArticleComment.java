package com.chaos.forum.entity;

import lombok.Data;

import java.sql.Date;

/**
 * <p>
 * { 文章评论 }
 * </p>
 *
 * @Author kay
 * 2019-10-05 19:18
 */
@Data
public class ArticleComment{

    private int id;

    private int userId;

    private String content;

    private String children;

    private Date createTime;
}
