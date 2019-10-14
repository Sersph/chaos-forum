package com.chaos.forum.tools;


import com.chaos.forum.exception.DataException;
import com.chaos.forum.returnx.enumx.ResultEnum;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


import java.io.File;

/**
 * <p>
 * { 图片压缩工具类 }
 * </p>
 *
 * @Author kay
 * 2019-10-03 15:12
 */
@Component
public class ImageTools {

    @Value("${forum.file.static-url}")
    private String staticUrl;

    private final String SUFFIX = "-150x150.jpg";

    /**
     * 指定单一文件转换为缩略图
     *
     * @param file
     * @return
     */
    public String singleImage(String file) {

        File filePath = new File(file);

        //获取文件扩展名
        String extension = filePath.getName().substring(filePath.getName().lastIndexOf(".") + 1);

        if (ImageTools.isImage(extension)) {

            /**
             *  不按照比例，指定大小进行缩放
             *  keepAspectRatio(false) 默认是按照比例缩放的
             * */
            try {
                Thumbnails.of(filePath)
                        .size(150, 150)
                        .keepAspectRatio(false)
                        .toFile(filePath.getAbsolutePath() + SUFFIX);
                return staticUrl + filePath.getName() + SUFFIX;
            } catch (Exception e) {
                throw new DataException(ResultEnum.FILE_CHANG_ERROR);
            }
        }
        return "404";
    }

    /**
     * 根据文件扩展名判断文件是否图片格式
     *
     * @param extension 文件扩展名
     * @return
     */
    public static boolean isImage(String extension) {
        String[] imageExtension = new String[]{"jpeg", "jpg", "gif", "bmp", "png"};
        for (String e : imageExtension) {
            if (extension.toLowerCase().equals(e)) {
                return true;
            }
        }
        return false;
    }
}

