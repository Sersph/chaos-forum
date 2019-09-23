import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 用户相关接口
 *
 */
interface Api {
  // 获取多条记录
  selectArticleList: (data: any) => object;
  // 获取单条记录
  selectArticleById: (id: any) => object;
  // 新增
  insertArticle: (data: any) => object;
  // 修改
  updateArticleById: (id: any, data: any) => object
  // 删除
  deleteArticleById: (id: any) => object
}

/**
 * 用户相关接口实现
 *
 */
const api: Api = {
  selectArticleList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person`,
      data
    );
  },
  selectArticleById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/person/${id}`
    );
  },
  insertArticle(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/person`,
      data
    );
  },
  updateArticleById(id: any, data: any): object {
    return ajax(
      'PUT',
      `${config.API_ROOT}/person/${id}`,
      data
    );
  },
  deleteArticleById(id: any): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/person/${id}`
    );
  }
};

export default api;
