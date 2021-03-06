package com.chaos.forum.returnx.enumx;


/**
 * { 统一返回枚举 }
 *
 * @Author kay
 * 2019-09-20 19:59
 */

public enum ResultEnum {
    SUCCESS(0),
    ERROR(00),

    LI_GIN_ERROR(101,"用户名或密码不正确"),
    LI_GIN_NULL(102,"用户未注册"),
    SIGN_IN_NOT(103,"用户注册失败"),
    SIGN_IN_ERROR(104,"用户已存在"),

    LI_GIN_NOT(108,"用户未登录"),
    LI_GIN_PAST(109,"用户登陆过期"),

    CREATE_ERROR(1002, "创建失败"),
    DELETE_ERROR(1003, "删除失败"),
    UPDATE_ERROR(1004, "修改失败"),
    SELECT_ERROR(1005,"查询失败"),

    FILE_ERROR(2002, "文件上传失败"),
    FILE_NOT_NULL(2003, "文件为空"),
    FILE_CHANG_ERROR(2004, "文件转化失败"),

    LIKE_ERROR(30002,"點贊取消|為點贊"),
    ;

    public Integer code;

    public String message;

    ResultEnum(Integer code) {
        this.code = code;
    }

    ResultEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
