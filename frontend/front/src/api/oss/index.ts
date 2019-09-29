import ajax from '../../util/ajax';
import config from '../../config';
import { OSSAPI } from '../../type/api';

const api: OSSAPI = {
  // 查询 oss sts token
  selectOssStsToken(data: any): object {
    return ajax(
      'GET',
      `${config.API_OSS_ROOT}/oss/stsToken`,
      data
    );
  }
};

export default api;
