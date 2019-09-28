package com.chaos.forum.aop;

import com.chaos.forum.returnx.enumx.ResultEnum;
import com.chaos.forum.vo.ResultVO;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * <p>
 * { 切面:实现权限验证 }
 * </p>
 *
 * @Author kay
 * 2019-09-28 14:16
 */
@Component
@Aspect
public class WebControllerAop {

    private final String POINT_CUT = "execution(* com.chaos.forum.controller..*.*(..))";

    /** 匹配com.chaos.forum.controller包及其子包下的所有类的所有方法 */
    @Pointcut(POINT_CUT)
    public void executeService() {
    }

    /**
     * 前置通知
     */
    @Before("executeService()")
    public void verify(JoinPoint joinPoint) {

        //获取RequestAttributes(请求属性)
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

        //从获取RequestAttributes中获取HttpServletRequest的信息  
        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);

        //获取session信息
        HttpSession session = (HttpSession) requestAttributes.resolveReference(RequestAttributes.REFERENCE_SESSION);
    }

}
