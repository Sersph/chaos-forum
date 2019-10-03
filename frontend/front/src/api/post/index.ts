import ajax from '../../util/ajax';
import config from '../../config';
import { PostAPI } from '../../type/api';

const api: PostAPI = {
  createPost: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/frontend/createPost`,
      data
    );
  },
  selectHotPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/hotPost`,
      data
    );
  },
  selectPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/post`,
      data
    );
  },
  selectPostCategoryDetail: (id: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/postCategory/${id}`
    );
  }
};

export default api;
