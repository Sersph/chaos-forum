// 用户接口声明
export interface AccountAPI {
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
}

// 用户接口声明
export interface PersonUserAPI {
  // 获取多条记录
  selectPersonUserList: (data: any) => object;
}

// 帖子接口声明
export interface PostAPI {
  // 获取多条记录
  selectPostList: (data: any) => object;
  // 删除
  deletePostById: (id: any) => object;
}

// 帖子分类接口声明
export interface PostCategoryAPI {
  // 获取所有记录
  selectPostCategoryAll: () => object;
  // 获取多条记录
  selectPostCategoryList: (data: any) => object;
  // 获取单条记录
  selectPostCategoryById: (id: any) => object;
  // 新增
  insertPostCategory: (data: any) => object;
  // 修改
  updatePostCategoryById: (id: any, data: any) => object
  // 删除
  deletePostCategoryById: (id: any) => object;
}

// API 接口合集
export interface API {
  account: AccountAPI;
  postCategory: PostCategoryAPI;
  post: PostAPI;
  personUser: PersonUserAPI;
}
