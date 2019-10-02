# 接口文档
## 用户注册/登录

#### 用户账户注册

- 请求方式 - 请求 URL

  - `POST` - `/frontend/user/signIn`

- 请求参数

  | 参数     | 必填 | 类型   | 备注     |
  | -------- | ---- | ------ | -------- |
  | username | yes  | string | 用户名   |
  | password | yes  | string | 用户密码 |

- 返回示例

  ```json
  // 成功
  {
      "code": 0
  }
  
  // 失败
  {
      "code": 1001,
      "message": "用户名已存在"
  }
  ```

#### 用户账户登陆

- 请求方式 - 请求 URL

  + `POST` - `/frontend/user/logIn`

- 请求参数

  | 参数     | 必填 | 类型   | 备注     |
  | -------- | ---- | ------ | -------- |
  | username | yes  | string | 用户名   |
  | password | yes  | string | 用户密码 |

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

#### 用户账户退出

- 请求方式 - 请求 URL

  - `GET` - `/frontend/user/logOut`

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

#### 用户修改信息(登陆密码)

- 请求方式 - 请求 URL

  - `GET` - `/frontend/user/alter `

- 请求参数

  | 参数     | 必填 | 类型   | 备注     |
  | -------- | ---- | ------ | -------- |
  | username | yes  | String | 用户名   |
  | password | yes  | String | 用户密码 |

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

## 文章

#### 用户发贴（创建文章）

- 请求方式 - 请求 URL

  - `POST` - `/frontend/article`

- 请求参数

  | 参数              | 必填 | 类型   | 备注       |
  | ----------------- | ---- | ------ | ---------- |
  | title             | yes  | string | 标题       |
  | content           | yes  | string | 内容       |
  | articleCategoryId | yes  | int    | 文章分类id |

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

#### 获取文章

- 请求方式 - 请求 URL

  - `POST` - `/frontend/article/:1`

- 请求参数

  | 参数              | 必填 | 类型   | 备注       |
  | ----------------- | ---- | ------ | ---------- |
  | title             | yes  | string | 标题       |
  | content           | yes  | string | 内容       |
  | articleCategoryId | yes  | int    | 文章分类id |

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

#### 文章点赞

- 请求方式 - 请求 URL

  - `POST` - `/frontend/article/like`

- 请求参数

  | 参数 | 必填 | 类型 | 备注 |
  | ---- | ---- | ---- | ---- |
  | 1    | no   | int  | 攒   |
  | 0    | no   | int  | 取消 |

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

## 文章分类

#### 获取所有文章分类 

- 请求方式 - 请求 URL

  - `GET` - `/frontend/articleCategoryAll`

- 请求参数`xxx`

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0,
      "data": [
          {
              "id": 1,
              "name": "111" 
          }
      ]
  }
  
  // 失败
  {
      "code": 1002,
      "message": "查询失败"
  }
  ```
