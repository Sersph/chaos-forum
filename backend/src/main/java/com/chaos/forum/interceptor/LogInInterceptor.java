package com.chaos.forum.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;


/**
 * <p>
 * { 登陆de拦截器 }
 * </p>
 *
 * @Author kay
 * 2019-09-25 15:42
 */

public class LogInInterceptor implements HandlerInterceptor {

    /**
     * 拦截（Controller方法调用之前）
     *
     * @param o        o
     * @param request  request
     * @param response response
     * @return 通过与否
     * @throws Exception 异常处理
     */


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        /**
         *  TODO 我这里是通过用户是否登陆进行拦截，我的用户信息存储在session中，名称为userInfo，大家可以自行实现
         * */
        if (null != request.getSession().getAttribute("adminUser")) {
            return true;
        }
        HashMap map = new HashMap(1000);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=utf-8");
        map.put("code" ,"108");
        map.put("message" ,"用户未登陆");
        String  param= JSON.toJSONString(map);
        response.getWriter().write(param);
        return false;
    }



    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
