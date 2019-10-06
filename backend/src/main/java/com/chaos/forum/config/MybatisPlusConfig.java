package com.chaos.forum.config;

import com.baomidou.mybatisplus.core.config.GlobalConfig;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;


/**
 * <p>
 * { mybatisPlus分页插件配置类 }
 * </p>
 *
 * @Author kay
 * 2019-09-22 21:48
 */
@EnableTransactionManagement
@Configuration
@MapperScan("com.chaos.forum.mapper*")
public class MybatisPlusConfig {



    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        return paginationInterceptor;
    }

    /**
     * mybatis-plus SQL执行效率插件【生产环境可以关闭】
     *  打印Sql语句
     */
    @Bean
    public PerformanceInterceptor performanceInterceptor() {
        return new PerformanceInterceptor();
    }
}
