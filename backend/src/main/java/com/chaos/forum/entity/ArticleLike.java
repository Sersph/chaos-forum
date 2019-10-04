package com.chaos.forum.entity;

import lombok.Data;

import java.sql.Date;

/**
 * <p>
 * { 文章點贊實體 }
 * </p>
 *
 * @Author kay
 * 2019-10-04 16:31
 */
@Data
public class ArticleLike {

    private int id;

    private int userId;

    private Date voteTime;

    private int articleId;

    private int status;
}
