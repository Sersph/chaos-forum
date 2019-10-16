import ajax from '../../util/ajax';
import config from '../../config';
import { PostAPI } from '../../type/api';

const api: PostAPI = {
  selectPostList: (data: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/manager/selectAllArticle`,
      data
    );
  },
  deletePostById: (id: any): object => {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/manager/deleteArticle/${id}`
    );
  }
};

export default api;
