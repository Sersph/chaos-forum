package com.chaos.forum.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 16:17
 */
@Data
public class FourmVO {

    private Integer code;

    private String message;

    private Object data;


    FourmVO fourmvo = new FourmVO();

    public FourmVO success() {
        fourmvo.setCode(0);
        return fourmvo;
    }

    public FourmVO error() {
        fourmvo.setCode(1);
        fourmvo.setMessage("用户名或密码不正确");
        return fourmvo;
    }
}
