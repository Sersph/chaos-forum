package com.chaos.forum.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.sql.Date;

/**
 * <p>
 * { 管理员用户实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 09:46
 */
@Data
public class AdminUser {

    @ApiModelProperty(value = " 管理员ID ")
    private int id;

    @ApiModelProperty(value = " 管理员名 ")
    @NotNull(message = "管理员名不为空")
    private String name;

    @ApiModelProperty(value = " 管理员密码 ")
    @NotNull(message = "密码不为空")
    private String password;

    @ApiModelProperty(value = " 管理员最后登陆时间 ")
    private Date finallyLoginTime;

    @ApiModelProperty(value = " 管理员创建时间 ")
    private Date createTime;

    @ApiModelProperty(value = " 管理员修改时间 ")
    private Date updateTime;


}
