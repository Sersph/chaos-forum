import account from './account';
import postCategory from './post-category';
import post from './post';
import personUser from './person-user';
import { API } from '../type/api';

const api: API = {
  account,
  postCategory,
  post,
  personUser
};

export default api;
