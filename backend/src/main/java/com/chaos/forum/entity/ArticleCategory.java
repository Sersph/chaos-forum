package com.chaos.forum.entity;

import java.sql.Date;

/**
 * <p>
 * { 分类实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 10:08
 */
public class ArticleCategory {

    private int id;

    private String name;

    private Date createTime;

    private Date updateTime;

    public ArticleCategory() {
    }

    public ArticleCategory(int id, String name, Date createTime, Date updateTime) {
        this.id = id;
        this.name = name;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
