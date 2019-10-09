package com.chaos.forum.controller;

import com.chaos.forum.service.IArticleCategoryService;
import com.chaos.forum.vo.ResultVO;
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
public class CategoryController {

    @Autowired
    IArticleCategoryService categoryService;

    /**
     * 返回所有文章分类
     *
     * @return
     */
    @GetMapping("/all")
    public ResultVO selectCategoryAll() {
        return this.categoryService.selectArticleAll();
    }
}
