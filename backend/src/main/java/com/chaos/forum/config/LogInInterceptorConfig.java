package com.chaos.forum.config;

import com.chaos.forum.interceptor.LogInInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <p>
 * { 登陆拦截器的配置 }
 * </p>
 *
 * @Author kay
 * 2019-09-25 15:46
 */

@Component
public class LogInInterceptorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInInterceptor()).addPathPatterns("/backend/**")
        .excludePathPatterns("/backend/manager/**");
    }

    /**
     * 图片路径转换
     * */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**").addResourceLocations("file:D:/date/images/");
    }
}

