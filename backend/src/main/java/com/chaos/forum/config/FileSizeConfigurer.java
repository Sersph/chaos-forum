package com.chaos.forum.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

/**
 * <p>
 * { 图片上传的大小限制配置 }
 * </p>
 *
 * @Author kay
 * 2019-09-26 21:02
 */
@Configuration
public class FileSizeConfigurer {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 单个文件最大10MB
        factory.setMaxFileSize(DataSize.ofMegabytes(10L));
        /// 设置总上传数据总大小10GB
        factory.setMaxRequestSize(DataSize.ofGigabytes(10L));
        return factory.createMultipartConfig();
    }
}
