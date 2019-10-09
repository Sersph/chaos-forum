import ajax from '../../util/ajax';
import config from '../../config';
import { AccountAPI } from '../../type/api';

const api: AccountAPI = {
  signUp: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/frontend/user/register`,
      data
    );
  },
  signIn: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/frontend/user/logIn`,
      data
    );
  },
  signOut: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/user/logOut`,
      {}
    );
  },
  selectUserInfo: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/frontend/user/userCase`,
      {}
    );
  },
  updateUserInfo: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/set`,
      data
    );
  }
};

export default api;
