package com.chaos.forum.controller;

import com.chaos.forum.service.IArticleCategoryService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-08 15:42
 */
@RestController
@RequestMapping("/frontend/category")
@Api(value = "前台分类管理器", description = "用于前台显示分类")
public class CategoryController {

    @Autowired
    IArticleCategoryService categoryService;

    @ApiOperation(value = "查找所有文章分类")
    @GetMapping("/all")
    public ResultVO selectCategoryAll() {
        return this.categoryService.selectArticleAll();
    }
}
