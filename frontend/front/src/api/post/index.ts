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
  selectPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/article/getAll`,
      data
    );
  },
  selectAllPostCategoryList: () => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/category/all`
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
