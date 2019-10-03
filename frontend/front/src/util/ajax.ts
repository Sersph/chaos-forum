import axios from 'axios';

// 携带 cookie
axios.defaults.withCredentials = true;

type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH';

/**
 * ajax 请求封装模块
 *
 */
export default function ajax(method: Method, url: string, data = {}): object {
  return new Promise(async (resolve, reject) => {
    // axios response 对象
    let response = {
      data: {}
    };
    try {
      switch (method) {
        case 'GET':
          // 发送 get
          response = await axios({
            method,
            url,
            params: data
          });
          break;
        case 'POST':
          // 发送 post
          response = await axios({
            method,
            url,
            data,
            transformRequest: [
              function (oldData) {
                let newStr = '';
                for (let item in oldData) {
                  newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&';
                }
                newStr = newStr.slice(0, -1);
                return newStr;
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          break;
        case 'PUT':
          // 发送 delete
          response = await axios({
            method,
            url,
            data,
            transformRequest: [
              function (oldData) {
                let newStr = '';
                for (let item in oldData) {
                  newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&';
                }
                newStr = newStr.slice(0, -1);
                return newStr;
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          break;
        case 'DELETE':
          // 发送 delete
          response = await axios({
            method,
            url,
            data,
            transformRequest: [
              function (oldData) {
                let newStr = '';
                for (let item in oldData) {
                  newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&';
                }
                newStr = newStr.slice(0, -1);
                return newStr;
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          break;
        default:
          console.log(`ajax request method error: ${method}`);
      }
      resolve(response.data);
    } catch (e) {
      reject(e);
    }
  });
}
