package com.chaos.forum.exception;

import com.chaos.forum.vo.ResultVO;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-09-20 20:31
 */
@ControllerAdvice
public class MyExceptionHandle {

    @ExceptionHandler(value = DataException.class)
    @ResponseBody
    public ResultVO handle(DataException e) {
        DataException dataException = (DataException) e;
        return new ResultVO(dataException.getResultEnum());
    }
}
