package com.chaos.forum.exception;

import com.chaos.forum.returnx.enumx.ResultEnum;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 20:20
 */
public class DataException extends RuntimeException {



    private ResultEnum resultEnum;

    public DataException(ResultEnum resultEnum){

        this.resultEnum = resultEnum;
    }

    public ResultEnum getResultEnum()
    {

        return resultEnum;
    }
}
