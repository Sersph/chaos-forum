import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 接口约束
 *
 */
interface Api {
  // 获取多条记录
  selectArticleCategoryList: (data: any) => object;
  // 获取单条记录
  selectArticleCategoryById: (id: any) => object;
  // 新增
  insertArticleCategory: (data: any) => object;
  // 修改
  updateArticleCategoryById: (id: any, data: any) => object
  // 删除
  deleteArticleCategoryById: (id: any) => object
}

/**
 * 接口实现
 *
 */
const api: Api = {
  selectArticleCategoryList(data: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategory`,
      data
    );
  },
  selectArticleCategoryById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategory/${id}`
    );
  },
  insertArticleCategory(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/articleCategory`,
      data
    );
  },
  updateArticleCategoryById(id: any, data: any): object {
    return ajax(
      'PUT',
      `${config.API_ROOT}/backend/articleCategory/${id}`,
      data
    );
  },
  deleteArticleCategoryById(id: any): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/articleCategory/${id}`
    );
  }
};

export default api;
