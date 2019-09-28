import ajax from '../../util/ajax';
import axios from 'axios';
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
  },
  fileUpload: (data: any): object => {
    // 单独用 axios 原生方法请求
    return axios({
      method: 'POST',
      url: `${config.API_ROOT}/file`,
      data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }
};

export default api;
