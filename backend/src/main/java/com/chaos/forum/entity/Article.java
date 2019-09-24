package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.beans.Transient;
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

    @ApiModelProperty(value = " 文章ID ")
    private int id;

    @ApiModelProperty(value = " 文章标题 ")
    private String title;

    @ApiModelProperty(value = " 文章内容 ")
    private String content;

    @ApiModelProperty(value = " 文章创建时间 ")
    private Date createTime;

    @ApiModelProperty(value = " 文章修改时间 ")
    private Date updateTime;

    @ApiModelProperty(value = " 文章分类ID ")
    private int articleCategoryId;

    @ApiModelProperty(value = " 文章分类名 ")
    @TableField(exist = false)
    private String  articleCategoryName;

}
