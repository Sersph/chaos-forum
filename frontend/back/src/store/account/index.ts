import api from '../../api';
import { AccountState } from '../../type/state';

// action type
enum ActionType {
  UPDATE_USER_INFO = 'updateUserInfo',
  CLEAR_ACCOUNT_STATE = 'clearAccountState'
}

// state
const initState: AccountState = {
  userInfo: {}
};

// action
// 修改当前登陆的用户信息
export const updateUserInfo = (userInfo: any): object => {
  return {
    type: ActionType.UPDATE_USER_INFO,
    data: {
      userInfo
    }
  };
};

// 异步修改当前登陆的用户信息
export const asyncUpdateUserInfo = (): object => {
  return async (dispatch: any) => {
    const result: any = await api.account.selectUserInfo();
    // const result: any = {
    //   code: 0,
    //   data: 'xxx'
    // };
    if (parseInt(result.code) === 0) {
      dispatch({
        type: ActionType.UPDATE_USER_INFO,
        data: {
          userInfo: {
            userName: result.data
          }
        }
      });
    }
  };
};

// 清空当前模块的状态
export const clearAccountState = (): object => {
  return {
    type: ActionType.CLEAR_ACCOUNT_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_USER_INFO:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_ACCOUNT_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
