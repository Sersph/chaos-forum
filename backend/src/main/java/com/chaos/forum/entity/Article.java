package com.chaos.forum.entity;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;

/**
 * <p>
 * { 文章实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 09:57
 */
@Data
public class Article {

    private int id;

    private String title;

    private String content;

    private Date createTime;

    private Date updateTime;

    private int articleCategoryId;

    private int adminUserId;
}
