import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
interface Api {
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
}

/**
 * 账户相关接口实现
 *
 */
const api:Api = {
  signIn(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/backend/manager/login`,
      data
    );
  },
  signOut(): object {
    return ajax(
      'DELETE',
      `${config.API_ROOT}/backend/manager/logOut`,
      {}
    );
  },
  selectUserInfo(): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/backend/manager/getUserName`,
      {}
    );
  }
};

export default api;
