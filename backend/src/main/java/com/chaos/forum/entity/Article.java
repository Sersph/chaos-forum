package com.chaos.forum.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

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

    private int id;

    @ApiModelProperty(value = " ")
    private String title;

    private String content;

    private Date createTime;

    private Date updateTime;

    private int articleCategoryId;

    private String articleCategoryName;


}
