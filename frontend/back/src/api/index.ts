import oss from './oss';
import account from './account';
import article from './article';
import articleCategory from './article-category';
import { API } from '../type/api';

const api: API = {
  oss,
  account,
  article,
  articleCategory
};

export default api;
