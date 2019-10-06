package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

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

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty(value = " 文章创建时间 ")
    private Date createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    @ApiModelProperty(value = " 文章修改时间 ")
    private Date updateTime;

    @ApiModelProperty(value = " 文章分类ID ")
    private int articleCategoryId;

    @ApiModelProperty(value = " 文章分类名 ")
    @TableField(exist = false)
    private String  articleCategoryName;

}
