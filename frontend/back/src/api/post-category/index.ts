import ajax from '../../util/ajax';
import config from '../../config';
import { PostCategoryAPI } from '../../type/api';

const api: PostCategoryAPI = {
  selectPostCategoryAll: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategoryAll`
    );
  },
  selectPostCategoryList: (data: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategory`,
      data
    );
  },
  selectPostCategoryById(id: any): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/articleCategory/${id}`
    );
  },
  insertPostCategory: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/articleCategory`,
      data
    );
  },
  updatePostCategoryById: (id: any, data: any): object => {
    return ajax(
      'PUT',
      `${config.API_ROOT}/backend/articleCategory/${id}`,
      data
    );
  },
  deletePostCategoryById: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/articleCategory/${id}`
    );
  }
};

export default api;
