package com.chaos.forum.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.chaos.forum.entity.PersonUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * { describe }
 * </p>
 *
 * @Author kay
 * 2019-10-02 14:07
 */
@Mapper
public interface UserMapper extends BaseMapper<PersonUser> {
}
