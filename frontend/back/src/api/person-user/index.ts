import ajax from '../../util/ajax';
import config from '../../config';
import { PersonUserAPI } from '../../type/api';

const api: PersonUserAPI = {
  selectPersonUserList: (data: any): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/manager/selectAll`,
      data
    );
  }
};

export default api;
