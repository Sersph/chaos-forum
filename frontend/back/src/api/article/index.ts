import ajax from '../../util/ajax';
import config from '../../config';
import { ArticleAPI } from '../../type/api';

const api: ArticleAPI = {
  selectArticleList: (data: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/article`,
      data
    );
  },
  selectArticleById: (id: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/article/${id}`
    );
  },
  insertArticle: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/article`,
      data
    );
  },
  updateArticleById: (id: any, data: any): object => {
    return ajax(
      'PUT',
      `${config.API_ROOT}/backend/article/${id}`,
      data
    );
  },
  deleteArticleById: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/article/${id}`
    );
  }
};

export default api;
