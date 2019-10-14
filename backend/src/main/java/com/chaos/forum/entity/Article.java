package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
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
public class Article implements Serializable {

    @TableId
    @ApiModelProperty(value = " 文章ID ")
    private int id;

    @NotNull
    @ApiModelProperty(value = " 文章标题 ")
    private String title;

    @NotNull
    @ApiModelProperty(value = " 文章内容 ")
    private String content;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty(value = " 文章创建时间 ")
    private Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    @ApiModelProperty(value = " 文章修改时间 ")
    private Date updateTime;

    @NotNull
    @ApiModelProperty(value = " 文章分类ID ")
    private int articleCategoryId;

    @ApiModelProperty(value = "预览图")
    private String preview;

    @ApiModelProperty(value = "创建者ID")
    private int creatorId;

    @ApiModelProperty(value = "评论总数")
    @TableField(exist = false)
    private int leaveWords;

    @ApiModelProperty(value = " 文章分类名 ")
    @TableField(exist = false)
    private String  articleCategoryName;

    @ApiModelProperty(value = " 文章创建者名 ")
    @TableField(exist = false)
    private String  creatorUsername;

    @ApiModelProperty(value = " 用户头像 ")
    @TableField(exist = false)
    private String buddha;

    @ApiModelProperty("总点赞数数")
    @TableField(exist = false)
    private int totalLike;
}
