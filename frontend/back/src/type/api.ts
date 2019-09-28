// 账户接口声明
export interface AccountAPI {
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
}

// 文章接口声明
export interface ArticleAPI {
  // 获取多条记录
  selectArticleList: (data: any) => object;
  // 获取单条记录
  selectArticleById: (id: any) => object;
  // 新增
  insertArticle: (data: any) => object;
  // 修改
  updateArticleById: (id: any, data: any) => object;
  // 删除
  deleteArticleById: (id: any) => object;
}

// 文章分类接口声明
export interface ArticleCategoryAPI {
  // 获取所有记录
  selectArticleCategoryAll: () => object;
  // 获取多条记录
  selectArticleCategoryList: (data: any) => object;
  // 获取单条记录
  selectArticleCategoryById: (id: any) => object;
  // 新增
  insertArticleCategory: (data: any) => object;
  // 修改
  updateArticleCategoryById: (id: any, data: any) => object
  // 删除
  deleteArticleCategoryById: (id: any) => object;
}

// OSS 对象存储接口声明
export interface OSSAPI {
  // 查询 oss sts token
  selectOssStsToken: (data: any) => object;
}

// API 接口合集
export interface API {
  account: AccountAPI,
  article: ArticleAPI,
  articleCategory: ArticleCategoryAPI,
  oss: OSSAPI
}
