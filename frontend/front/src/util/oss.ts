import { Base64 } from 'js-base64';
import api from '../api';

export default {
  /**
   * 查询 oss sts token
   *
   */
  async selectOssStsToken() {
    // oss sts token 缓存的时间(60 秒)
    const OssStsTokenCacheTime = 60;
    // 注意, 后端接口返回的 oss sts token 有效时间为 15 分钟
    // 获取缓存中的 oss sts token
    const ossStsTokenTemp = JSON.parse(window.localStorage.getItem('ossStsToken') as string);
    // 判断缓存中的 oss sts token 不为空并且获取时间的间隔小于 60 秒, 返回缓存中的 oss sts token
    if (ossStsTokenTemp !== null && new Date().getTime() / 1000 - ossStsTokenTemp.generatorTime <= OssStsTokenCacheTime) {
      // 缓存中有 token 返回缓存中的 token
      return ossStsTokenTemp.ossStsToken;
    } else {
      // 重新请求服务器获取 token 并缓存起来
      let result: any = await api.oss.selectOssStsToken({});
      if (result.code === 0) {
        const ossStsToken = JSON.parse(Base64.decode(result.data));
        // 缓存 oss sts token
        window.localStorage.setItem('ossStsToken', JSON.stringify({
          generatorTime: new Date().getTime() / 1000,
          ossStsToken
        }));
        // 返回 oss sts token
        return ossStsToken;
      } else {
        console.error(result);
        return {};
      }
    }
  }
};
