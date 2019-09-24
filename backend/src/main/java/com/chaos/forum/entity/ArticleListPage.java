package com.chaos.forum.entity;

import lombok.Data;

import java.util.List;

/**
 * <p>
 * { 文章列表 }
 * </p>
 *
 * @Author kay
 * 2019-09-22 21:31
 */
@Data
public class ArticleListPage {

    private Integer page = 1;

    private Integer pageSize = 5;

    private String sortField;

    private String sortOrder;

    private String title;
}
