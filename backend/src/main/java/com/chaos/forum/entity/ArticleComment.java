package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
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
public class ArticleComment{

    @ApiModelProperty("文章评论ID")
    private int id;

    @NotNull
    @ApiModelProperty("用户ID")
    private int userId;

    @NotNull
    @ApiModelProperty("评论内容")
    private String content;

    @ApiModelProperty("被评论人的ID")
    private int parentUserId;

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty("评论的文章ID")
    private int articleId;

//    @TableField(exist = false)
//    private String children;
}
