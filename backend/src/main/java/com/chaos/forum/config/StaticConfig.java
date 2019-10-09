package com.chaos.forum.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-08 22:04
 */
@Component
public class StaticConfig implements WebMvcConfigurer {
    /**
     * 静态资源映射配置
     *
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**")
                .addResourceLocations("classpath:/static/");
    }
}
