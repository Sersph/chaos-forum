package com.chaos.forum.exception;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.vo.ResultVO;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * <p>
 * { 自定义全局异常异常处理类 }
 * </p>
 *
 * @Author kay
 * 2019-09-20 20:31
 */
@ControllerAdvice
public class MyExceptionHandle extends RuntimeException {

    @ExceptionHandler(value = DataException.class)
    @ResponseBody
    protected ResultVO handle(DataException e) {
        return new ResultVO(e.getResultEnum());
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResultVO ha(Exception e){
        e.printStackTrace();

        //这里返回0
        return new ResultVO(ResultEnum.SUCCESS);
    }



}
