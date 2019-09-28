package com.chaos.forum.vo;

import com.chaos.forum.returnx.enumx.ResultEnum;
import lombok.Data;

/**
 * { 统一数据返回格式 }
 *
 * @param  code 返回值
 * @param  message 返回内容
 * @param data  返回数据
 *
 * @Author kay
 * 2019-09-20 16:17
 */
@Data
public class ResultVO extends Throwable {

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
