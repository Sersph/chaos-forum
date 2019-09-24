package com.chaos.forum.tools;

import java.sql.Date;

/**
 * <p>
 * { 数据库工具类 }
 * </p>
 *
 * @Author kay
 * 2019-09-22 21:06
 */
public class DatabaseTools {

    public static Date getSqlDate() {
         return shiftDate(new java.util.Date());
    }

    public static Date shiftDate(java.util.Date date) {
        return new java.sql.Date(date.getTime());
    }

    /**
     * 将驼峰字符串转换为下划线形式
     * @param str
     * @return
     */
    public static String humpIsUnderlined(String str) {
        StringBuilder result = new StringBuilder();
        if (str != null && str.length() > 0) {
            // 将第一个字符处理成大写
            result.append(str.substring(0, 1).toLowerCase());
            // 循环处理其余字符
            for (int i = 1; i < str.length(); i++) {
                String s = str.substring(i, i + 1);
                // 在大写字母前添加下划线
                if (s.equals(s.toUpperCase()) && !Character.isDigit(s.charAt(0))) {
                    result.append("_");
                }
                // 其他字符直接转成大写
                result.append(s.toLowerCase());
            }
        }
        return result.toString();
    }
}
