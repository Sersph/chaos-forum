package com.chaos.forum.returnx.enumx;

/**
 * <p>
 * { 统一返回枚举 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 19:59
 */
public enum ResultEnum {
    LIGIN__SUCCESS(0, "登陆成功"),
    LIGIN__ERROR(1001,"用户名或密码不正确"),

    CREATE__SUCCESS(0, "创建成功"),
    CREATE__ERROR(1002, "创建失败"),

    UPDATE__SUCCESS(0, "修改成功"),
    UPDATE__ERROR(1003, "修改失败"),
    ;

    public Integer code;

    public String message;

    ResultEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
