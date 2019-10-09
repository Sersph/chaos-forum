// OSS 对象存储接口声明
export interface OSSAPI {
  // 查询 oss sts token
  selectOssStsToken: (data: any) => object;
}

// 用户相关接口声明
export interface AccountAPI {
  // 注册
  signUp: (data: any) => object;
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
  // 修改用户信息
  updateUserInfo: (data: any) => object;
}

// 帖子相关接口声明
export interface PostAPI {
  // 创建帖子接口
  insertPost: (data: any) => object;
  // 获取文章
  selectPostList: (data: any) => object;
  // 获取帖子分类
  selectAllPostCategoryList: () => object;
  // 文件上传
  fileUpload: (data: any) => object;
}

// 整合所有接口
export interface API {
  oss: OSSAPI;
  account: AccountAPI;
  post: PostAPI;
}
