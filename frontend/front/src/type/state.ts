// 用户状态接口声明
export interface AccountState {
  // 当前登陆的用户信息
  userInfo: any;
}

// 帖子状态接口声明
export interface PostState {
  // 所有的文章分类
  allPostCategoryList: any;
}

// 整合所有状态
export interface AppState {
  account: AccountState;
}
