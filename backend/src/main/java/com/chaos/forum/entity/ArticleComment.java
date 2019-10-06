package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Date;

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

    @ApiModelProperty("id")
    private int id;

    @ApiModelProperty("用户ID")
    private int userId;

    @ApiModelProperty("评论内容")
    private String content;

    @ApiModelProperty("被评论人的ID")
    private int parentUserId;

    @ApiModelProperty("创建时间")
    private Date createTime;

    @ApiModelProperty("评论的文章ID")
    private int articleId;

//    @TableField(exist = false)
//    private String children;
}
