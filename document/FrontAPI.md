# 接口文档
## 用户注册/登录

#### 用户账户注册

- 请求方式 - 请求 URL

  - `POST` - `/frontend/user/signIn`

- 请求参数

  | 参数     | 必填 | 类型   | 备注     |
  | -------- | ---- | ------ | -------- |
  | buddha   | no   | String | 头像     |
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

  - `Put` - `/frontend/user/alter `

- 请求参数

  | 参数     | 必填 | 类型   | 备注     |
  | -------- | ---- | ------ | -------- |
  | username | no   | String | 用户头像 |
  | password | no   | String | 用户密码 |

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

#### 用户信息查询

- 请求方式 - 请求 URL

  - `GET` - `/frontend/user/userCase `

- 请求参数

  - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0
      "username":"xxxxx"
      "buddha": 
  }
  
  // 失败
  {
      "code": 1001
  }
  ```

## 文章

#### 用户发贴（创建文章）

- 请求方式 - 请求 URL

  - `POST` - `/frontend/article/sava`

- 请求参数

  | 参数              | 必填 | 类型   | 备注       |
  | ----------------- | ---- | ------ | ---------- |
  | title             | yes  | string | 标题       |
  | content           | yes  | string | 内容       |
  | articleCategoryId | yes  | int    | 文章分类id |
  | preview           | no   | String | 预览图     |

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



#### 删除文章

- 请求方式 - 请求 URL

  - `Delete` - `/frontend/article/delete/:1`

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

#### 获取单一文章

- 请求方式 - 请求 URL

  - `Get` - `/frontend/article/getOne/:1`

- 请求参数

  | 参数 | 必填 | 类型 | 备注   |
  | ---- | ---- | ---- | ------ |
  | id   | yes  | int  | 文章ID |

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

#### 获取所有文章列表

- 请求方式 - 请求 URL

  - `Get` - `/frontend/article/getAll`

- 请求参数

  | 参数              | 必填 | 类型   | 备注                   |
  | ----------------- | ---- | ------ | ---------------------- |
  | title             | no   | string | 标题                   |
  | page              | no   | int    | 页码                   |
  | pageSize          | no   | int    | 条数                   |
  | sortField         | no   | string | 排序的字段(数据库)     |
  | sortOrder         | no   | string | 排序的顺序(倒序：正序) |
  | articleCategoryId | no   | int    | 分类id                 |

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

## 文章点赞

#### (添加或取消)文章点赞

- 请求方式 - 请求 URL

  - `Post` - `/frontend/article/like`

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

## 文章评论

#### 添加文章评论

- 请求方式 - 请求 URL

  - `Post` - `/frontend/article/saveComment`

- 请求参数

  | 参数      | 必填 | 类型 | 备注       |
  | --------- | ---- | ---- | ---------- |
  | articleId | yes  | int  | 评论文章id |
  | content   | yes  | int  | 评论内容   |

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

#### 查询文章评论列表

- 请求方式 - 请求 URL

  - `Get` - `/frontend/article/comment`

- 请求参数

  | 参数      | 必填 | 类型   | 备注     |
  | --------- | ---- | ------ | -------- |
  | content   | yes  | String | 评论内容 |
  | articleId | yes  | int    | 文章ID   |

- 返回示例

  ```json
  // 成功
  {
      [
  	{
  		id
  		contnet
  		date
  		userbuddha
  		username
  		ziShuzu: [
  			{
  				id
  				pid: id
  				contnet
  				date
  				userbuddha
  				username
  				ziShuzu: [
  					{
  						id
  						pid: id
  						contnet
  						date
  						userbuddha
  						username
  					},
  				]
  			},
  		]
  	},
  }
  
  // 失败
  {
      "code": 1002,
      "message": "修改失败"
  }
  ```



#### 文章删除

- 请求方式 - 请求 URL

  - `Delect` - `/frontend/article/delentComment/:1`
  - 请求参数
    - 无

- 返回示例

  ```json
  // 成功
  {
      "code": 0,
  }
  // 失败
  {
      "code": 1002,
      "message": "删除失败"
  }
  ```

## 文章分类

#### 获取所有文章分类 

- 请求方式 - 请求 URL

  - `GET` - `/frontend/category/all`

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



