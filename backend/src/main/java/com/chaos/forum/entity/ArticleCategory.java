package com.chaos.forum.entity;

import io.swagger.annotations.ApiModelProperty;
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

    @ApiModelProperty(value = " 文章分类ID ")
    private int id;

    @ApiModelProperty(value = " 文章分类名 ")
    private String name;

    @ApiModelProperty(value = " 文章分类创建时间 ")
    private Date createTime;

    @ApiModelProperty(value = " 文章分类修改时间 ")
    private Date updateTime;

}
