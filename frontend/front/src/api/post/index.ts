import ajax from '../../util/ajax';
import config from '../../config';
import { PostAPI } from '../../type/api';

const api: PostAPI = {
  insertPost: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/frontend/article/sava`,
      data
    );
  },
  selectPost: (id: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/article/getOne/${id}`
    );
  },
  selectPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/article/getAll`,
      data
    );
  },
  selectAllPostCategoryList: () => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/category/all`
    );
  },
  insertPostMessage: (data: any) => {
    return ajax(
      'POST',
      `${config.API_ROOT}/frontend/article/saveComment`,
      data
    );
  },
  selectPostMessage: (id: any, data: any) => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/article/getComment/${id}`,
      data
    );
  },
  fileUpload: (data: any) => {
    return ajax(
      'POST_FILE',
      `${config.UPLOAD_API_ROOT}`,
      data
    );
  }
};

export default api;
