package com.chaos.forum.vo;

import com.chaos.forum.returnx.enumx.ResultEnum;
import lombok.Data;

/**
 * { 统一数据返回格式 }
 *
 * @Author kay
 * 2019-09-20 16:17
 */
@Data
public class ResultVO{

    private Integer code;

    private String message;

    private Object data;

    public ResultVO(ResultEnum resultEnum) {
        this.code = resultEnum.code;
        this.message = resultEnum.message;
    }

    public ResultVO(ResultEnum resultEnum, Object data) {
        this.code = resultEnum.code;
        this.message = resultEnum.message;
        this.data = data;
    }
}
