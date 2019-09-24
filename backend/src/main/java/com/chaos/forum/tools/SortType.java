package com.chaos.forum.tools;

/**
 * { 排序枚举 }
 *
 * @param sort 返回asd/desc
 *
 * @Author kay
 * 2019-09-23 17:55
 */
public enum SortType {

    DESC("desc"),
    ASD("asd");

    private String sort;

    SortType(String sort) {
        this.sort = sort;
    }
}
