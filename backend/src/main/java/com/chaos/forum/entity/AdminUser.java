package com.chaos.forum.entity;

import java.sql.Date;

/**
 * <p>
 * { 管理员实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 09:46
 */
public class AdminUser {

    private int id;

    private String name;

    private String password;

    private Date finallyLoginTime;

    private Date createTime;

    private Date updateTime;

    public AdminUser() {
    }

    public AdminUser(int id, String name, String password, Date finallyLoginTime, Date createTime, Date updateTime) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.finallyLoginTime = finallyLoginTime;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getFinallyLoginTime() {
        return finallyLoginTime;
    }

    public void setFinallyLoginTime(Date finallyLoginTime) {
        this.finallyLoginTime = finallyLoginTime;
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
