package com.chaos.forum.returnx.enumx;

import lombok.Data;

/**
 * <p>
 * { 统一返回枚举 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 19:59
 */

public enum ResultEnum {
    LIGIN__SUCCESS(0),
    LIGIN__ERROR(1001,"用户名或密码不正确"),
    LIGIN__NULL(1002,"用户名或密码不为空"),


    CREATE__SUCCESS(0),
    CREATE__ERROR(1002, "创建失败"),

    UPDATE__SUCCESS(0),
    UPDATE__ERROR(1003, "修改失败"),

    DELETE__SUCCESS(0),
    DELETE__ERROR(1004, "删除失败")
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
