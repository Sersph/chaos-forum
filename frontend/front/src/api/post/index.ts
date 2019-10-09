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
  selectAllPostCategoryList: () => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/postCategory`
    );
  },
  fileUpload: (data: any) => {
    return ajax(
      'POST_FILE',
      `${config.MOCK_API_ROOT}/file`,
      data
    );
  }
};

export default api;
