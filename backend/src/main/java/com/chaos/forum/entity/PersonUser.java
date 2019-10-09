package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

/**
 * <p>
 * { 用户实体 }
 * </p>
 *
 * @Author kay
 * 2019-10-02 14:05
 */
@Data
public class PersonUser {

    @ApiModelProperty(value = " 用户ID ")
    private int id;

    @ApiModelProperty(value = " 用户头像 ")
    private String buddha;

    @ApiModelProperty(value = " 用户名 ")
    private String username;

    @ApiModelProperty(value = " 用户密码 ")
    @Pattern(regexp = "^[a-z,A-Z,1-9]{6,18}$")
    private String password;

    @ApiModelProperty(value = " 用户最后登陆时间 ")
    private Date finallyLoginTime;

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty(value = " 用户创建时间 ")
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @ApiModelProperty(value = " 用户修改时间 ")
    private Date updateTime;
}
