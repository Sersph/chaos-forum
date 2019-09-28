import ajax from '../../util/ajax';
import config from '../../config';
import { AccountAPI } from '../../type/api';

const api: AccountAPI = {
  signIn: (data: any): object => {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/manager/logIn`,
      data
    );
  },
  signOut: (): object => {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/manager/logOut`,
      {}
    );
  },
  selectUserInfo: (): object => {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/manager/getUserName`,
      {}
    );
  }
};

export default api;
