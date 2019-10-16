package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * { 文章评论实体 }
 * </p>
 *
 * @Author kay
 * 2019-10-05 19:18
 */
@Data
public class ArticleComment  implements Serializable {


    @ApiModelProperty("文章评论ID")
    private int id;

    @NotNull
    @ApiModelProperty("用户ID")
    private int userId;

    @NotNull
    @ApiModelProperty("评论内容")
    private String content;

    @JsonFormat(timezone = "GMT+8", shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty("创建时间")
    private Date createTime;

    @JsonFormat(timezone = "GMT+8", shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty("评论的文章ID")
    private int articleId;

    @ApiModelProperty("评论人头像")
    @TableField(exist = false)
    private String buddha;

    @ApiModelProperty("评论人")
    @TableField(exist = false)
    private String username;
}
