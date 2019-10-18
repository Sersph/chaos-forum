package com.chaos.forum.controller;

import com.chaos.forum.entity.ArticleCategory;
import com.chaos.forum.entity.ArticleListPage;
import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.service.IArticleCategoryService;
import com.chaos.forum.vo.ResultVO;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * { 文章分类管理层 }
 * </p>
 *
 * @Author kay
 * 2019-09-23 14:48
 */
@RestController
@RequestMapping("/backend")
public class ArticleCategoryController {

    @Autowired
    private IArticleCategoryService categorySercvice;

    @ApiOperation(value = "创建文章分类", notes = "后台创建文章分类")
    @PostMapping("/articleCategory")
    public ResultVO createCategory(ArticleCategory articleCategoryName) {
        return categorySercvice.createCategory(articleCategoryName);
    }

    @ApiOperation(value = "删除分类", notes = "通过接收分类ID删除文章分类")
    @ApiImplicitParam(name = "id", value = "分类ID", required = true, dataType = "int", paramType = "path")
    @DeleteMapping("/articleCategory/{id}")
    public ResultVO delectCategory(@PathVariable int id) {
        if (categorySercvice.removeById(id)) {
            return new ResultVO(ResultEnum.SUCCESS);
        }
        return new ResultVO(ResultEnum.DELETE_ERROR);
    }

    @ApiOperation(value = "修改分类", notes = "通过接收分类ID修改文章分类")
    @ApiImplicitParam(name = "id", value = "分类ID", required = true, dataType = "int", paramType = "path")
    @PutMapping("/articleCategory/{id}")
    public ResultVO updateCategory(ArticleCategory articleCategoryName, @PathVariable int id) {
        articleCategoryName.setId(id);
        return categorySercvice.updateCategory(articleCategoryName);
    }

    @ApiOperation(value = "查询单一文章分类")
    @ApiImplicitParam(name = "id", value = "分类ID", required = true, dataType = "int", paramType = "path")
    @GetMapping("/articleCategory/{id}")
    public ResultVO selectOneCategory(@PathVariable int id) {
        if (categorySercvice.getById(id) != null) {
            return new ResultVO(ResultEnum.SUCCESS, categorySercvice.getById(id));
        }
        return new ResultVO(ResultEnum.LI_GIN_PAST);
    }

    @ApiOperation(value = "分页查询所有分类")
    @GetMapping("/articleCategory")
    public ResultVO selectCategory(ArticleListPage articleListPage) {
        return categorySercvice.selectCategory(articleListPage);
    }

    @ApiOperation(value = "查询所有分类")
    @GetMapping("/articleCategoryAll")
    public ResultVO selectCategoryAll() {
        return this.categorySercvice.selectArticleAll();
    }

}
