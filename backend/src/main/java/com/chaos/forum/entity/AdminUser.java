package com.chaos.forum.entity;

import lombok.Data;

import java.sql.Date;

/**
 * <p>
 * { 管理员实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 09:46
 */
@Data
public class AdminUser {

    private int id;

    private String name;

    private String password;

    private Date finallyLoginTime;

    private Date createTime;

    private Date updateTime;


}
