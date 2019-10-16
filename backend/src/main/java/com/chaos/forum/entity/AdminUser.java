package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * { 管理员用户实体类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 09:46
 */
@Data
public class AdminUser implements Serializable {

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

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty(value = " 管理员创建时间 ")
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @ApiModelProperty(value = " 管理员修改时间 ")
    private Date updateTime;


}
