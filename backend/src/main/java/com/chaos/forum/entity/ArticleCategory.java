package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

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

    @NotNull
    @ApiModelProperty(value = " 文章分类ID ")
    private int id;

    @NotNull
    @ApiModelProperty(value = " 文章分类名 ")
    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty(value = " 文章分类创建时间 ")
    private Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    @ApiModelProperty(value = " 文章分类修改时间 ")
    private Date updateTime;

}
