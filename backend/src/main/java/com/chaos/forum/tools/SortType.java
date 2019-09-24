package com.chaos.forum.tools;

/**
 * <p>
 * { 排序枚举 }
 * </p>
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
