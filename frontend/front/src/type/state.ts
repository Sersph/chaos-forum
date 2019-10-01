// 账户状态接口声明
export interface AccountState {
  // 当前登陆的用户信息
  userInfo: any;
}

// 整合所有状态
export interface AppState {
  account: AccountState;
}
