package com.chaos.forum.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

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

    private int id;

    private int userId;

    @TableField(fill = FieldFill.INSERT)
    @ApiModelProperty("点赞时间")
    private Date voteTime;

    private int articleId;

    private int status;
}
