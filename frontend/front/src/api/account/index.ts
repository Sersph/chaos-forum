import ajax from '../../util/ajax';
import config from '../../config';
import { AccountAPI } from '../../type/api';

const api: AccountAPI = {
  signUp: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/code`,
      data
    );
  },
  signIn: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/code`,
      data
    );
  },
  signOut: (): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/check`,
      {}
    );
  },
  selectUserInfo: (): object => {
    return ajax(
      'GET',
      `${config.MOCK_API_ROOT}/frontend/userInfo`,
      {}
    );
  },
  updateUserInfo: (data: any): object => {
    return ajax(
      'POST',
      `${config.MOCK_API_ROOT}/set`,
      data
    );
  }
};

export default api;
