package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * <p>
 * { 文章點贊實體 }
 * </p>
 *
 * @Author kay
 * 2019-10-04 16:31
 */
@Data
public class ArticleLike {

    @ApiModelProperty("文章点赞ID")
    private int id;

    @NotNull
    @ApiModelProperty("用户ID")
    private int userId;

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty("点赞时间")
    private Date voteTime;

    @NotNull
    @ApiModelProperty("文章ID")
    private int articleId;

    @NotNull
    @ApiModelProperty("点赞的状态---1点赞：0取消")
    private int status;
}
