package com.chaos.forum.aop;

import com.chaos.forum.exception.DataException;
import com.chaos.forum.returnx.enumx.ResultEnum;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
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

    private final String POINT_CUT = "@annotation(com.chaos.forum.decorator.Calibrator)";

    /**
     * 切面点
     * 匹配com.chaos.forum.controller包及其子包下的所有类的所有方法
     * */
    @Pointcut(POINT_CUT)
    public void executeService() {
    }

    /**
     * 前置通知
     *
     * 	JoinPoint连接点
     */
    @Before("executeService()")
    public void verify(JoinPoint joinPoint) {

        //获取RequestAttributes(请求属性)
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

        //从获取RequestAttributes中获取HttpServletRequest的信息  
        HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);

        //获取session信息
        HttpSession session = (HttpSession) requestAttributes.resolveReference(RequestAttributes.REFERENCE_SESSION);

        if (session.getAttribute("personUser") == null) {
            throw new DataException(ResultEnum.LI_GIN_NOT);
        }


    }



    /**
     * 后置通知
     * @param joinPoint
     * @param val
     */
    public void commit(JoinPoint joinPoint,Object val){
        System.out.println(val);
        System.out.println("commit");
    }

    /**
     * 异常通知
     */
    public void throwingMethod(JoinPoint joinPoint,Throwable ex){
        System.out.println(ex.getMessage());
    }

    /**
     * 最终通知
     */
    public void finallyMethod(){
        System.out.println("finally method");
    }

    /**
     * 环绕通知
     *   控制目标方法的执行
     */
    public void aroundMethod(ProceedingJoinPoint joinPoint) {
        //获取目标方法的名称
//        String methodName = joinPoint.getSignature().getName();
//        if(methodName.equals("savePerson")){
//            joinPoint.proceed();//调用目标方法
//        }else{
//            System.out.println("权限不足");
//        }
    }

}
