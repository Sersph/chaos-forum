import ajax from '../../util/ajax';
import config from '../../config';
import { PostAPI } from '../../type/api';

const api: PostAPI = {
  insertPost: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/frontend/article/sava`,
      data
    );
  },
  agreePost: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/frontend/article/like`,
      data
    );
  },
  selectAgreePostList: (): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/article/selectLike`
    );
  },
  selectPost: (id: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/article/getOne/${id}`
    );
  },
  deletePost: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.MOCK_API_ROOT}/frontend/article/delete/${id}`
    );
  },
  selectPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/article/getAll`,
      data
    );
  },
  selectAllPostCategoryList: (): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/category/all`
    );
  },
  insertPostMessage: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/frontend/article/saveComment`,
      data
    );
  },
  deletePostMessage: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.MOCK_API_ROOT}/frontend/article/delentComment/${id}`
    );
  },
  selectPostMessage: (id: any, data: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/article/getComment/${id}`,
      data
    );
  },
  fileUpload: (data: any): object => {
    return ajax(
      'POST_FILE',
      `${config.UPLOAD_API_ROOT}`,
      data
    );
  }
};

export default api;
