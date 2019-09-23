# 接口文档
## 管理员用户

#### 管理员账户登录

- 请求方式 - 请求 URL
  
  + `POST` - `/backend/manager/login`
  
- 请求参数

  | 参数     | 必填 | 类型   | 备注   |
  | -------- | ---- | ------ | ------ |
  | name     | yes  | string | 用户名 |
  | password | yes  | string | 密码   |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }

  // 失败
  {
      "code": 1001,
      "message": "用户名或密码不正确"
  }
  ```

#### 管理员账户推出

- 请求方式 - 请求 URL

  - `GET` - `/backend/manager/logOut`

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1001
  }
  ```

#### 获取当前管理员登录状态

- 请求方式 - 请求 URL

  - `POST` - `/backend/manager/getUserName`

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0,
      "data": "xxx"
  }
  
  // 失败
  {
      "code": 1001,
      "message": "登录状态已失效，请重新登录"
  }
  ```

## 

## 文章

#### 创建文章

- 请求方式 - 请求 URL

  - `POST` - `/backend/article`

- 请求参数

  | 参数                | 必填 | 类型   | 备注       |
  | ------------------- | ---- | ------ | ---------- |
  | title               | yes  | string | 标题       |
  | content             | yes  | string | 内容       |
  | article_category_id | yes  | int    | 文章分类id |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "创建失败"
  }
  ```

#### 查询单一文章

- 请求方式 - 请求 URL

  - `GET` - `/backend/article/:id`

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0,
      "data": {
          "id": 1,
          "title": "2132131",
          "content": "12312",
          ...
      }
  }
  
  // 失败
  {
      "code": 1002,
      "message": "登录信息已过期，请登录后重试！"
  }
  ```

#### 修改文章

- 请求方式 - 请求 URL

  - `PUT` - `/backend/article/:id`

- 请求参数

  | 参数                | 必填 | 类型   | 备注       |
  | ------------------- | ---- | ------ | ---------- |
  | title               | yes  | string | 标题       |
  | content             | yes  | string | 内容       |
  | article_category_id | yes  | int    | 文章分类id |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "修改失败"
  }
  ```

#### 删除文章

- 请求方式 - 请求 URL

  - `DELETE ` - `/backend/article/:id`

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "删除失败"
  }
  ```

#### 查询文章

- 请求方式 - 请求 URL

  - `GET` - `/backend/article`

- 请求参数

  | 参数      | 必填 | 类型   | 备注                   |
  | --------- | ---- | ------ | ---------------------- |
  | page      | no   | int    | 页码                   |
  | pageSize  | no   | int    | 一页多少条             |
  | sortField | no   | string | 排序的字段(数据库)     |
  | sortOrder | no   | string | 排序的顺序(倒序，正序) |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "查询失败"
  }
  ```

## 文章分类

#### 创建文章分类

- 请求方式 - 请求 URL

  - `POST` - `/backend/articleCategory`

- 请求参数

  | 参数 | 必填 | 类型   | 备注   |
  | ---- | ---- | ------ | ------ |
  | name | yes  | string | 分类名 |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "创建失败"
  }
  ```

#### 修改文章分类

- 请求方式 - 请求 URL

  - `PUT` - `/backend/articleCategory/:id`

- 请求参数

  | 参数 | 必填 | 类型   | 备注   |
  | ---- | ---- | ------ | ------ |
  | name | yes  | string | 分类名 |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "修改失败"
  }
  ```

#### 删除文章分类

- 请求方式 - 请求 URL

  - `DELETE ` - `/backend/articleCategory/:id`

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "删除失败"
  }
  ```

#### 查询文章分类

- 请求方式 - 请求 URL

  - `GET` - `/backend/articleCategory`

- 请求参数

  | 参数      | 必填 | 类型   | 备注                   |
  | --------- | ---- | ------ | ---------------------- |
  | page      | no   | int    | 页码                   |
  | pageSize  | no   | int    | 一页多少条             |
  | sortField | no   | string | 排序的字段(数据库)     |
  | sortOrder | no   | string | 排序的顺序(倒序，正序) |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1002,
      "message": "查询失败"
  }
  ```

