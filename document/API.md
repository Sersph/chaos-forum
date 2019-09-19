# 接口文档
## 管理员用户

#### 1.管理员账户登录

- 请求方式 - 请求 URL
  + `POST` - `/manager/login`
  
- 请求参数

  | 参数     | 必填 | 类型   | 备注   |
  | -------- | ---- | ------ | ------ |
  | name     | Yes  | String | 用户名 |
  | password | Yes  | String | 密码   |

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

