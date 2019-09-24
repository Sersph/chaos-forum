package com.chaos.forum.entity;

import lombok.Data;

import java.sql.Date;

/**
 * <p>
 * { 文章分类实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:08
 */
@Data
public class ArticleCategory {

    private int id;

    private String name;

    private Date createTime;

    private Date updateTime;

}
