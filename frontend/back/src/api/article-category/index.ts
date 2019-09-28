import ajax from '../../util/ajax';
import config from '../../config';
import { ArticleCategoryAPI } from '../../type/api';

const api: ArticleCategoryAPI = {
  selectArticleCategoryAll: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategoryAll`
    );
  },
  selectArticleCategoryList: (data: any): object => {
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
  insertArticleCategory: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/articleCategory`,
      data
    );
  },
  updateArticleCategoryById: (id: any, data: any): object => {
    return ajax(
      'PUT',
      `${config.API_ROOT}/backend/articleCategory/${id}`,
      data
    );
  },
  deleteArticleCategoryById: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/articleCategory/${id}`
    );
  }
};

export default api;
