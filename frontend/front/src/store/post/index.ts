import { PostState } from '../../type/state';

// action type
enum ActionType {
  UPDATE_ALL_POST_CATEGORY_LIST = 'updateAllPostCategoryList',
  CLEAR_POST_STATE = 'clearPostState'
}

// state
const initState: PostState = {
  allPostCategoryList: null
};

// action
// 是否已经获取帖子分类详情
export const updateAllPostCategory = (allPostCategoryList): object => {
  return {
    type: ActionType.UPDATE_ALL_POST_CATEGORY_LIST,
    data: {
      allPostCategoryList
    }
  };
};

// 清空当前模块的状态
export const clearPostState = (): object => {
  return {
    type: ActionType.CLEAR_POST_STATE
  };
};

// reducer
export default (state = initState, action: any): any => {
  switch (action.type) {
    case ActionType.UPDATE_ALL_POST_CATEGORY_LIST:
      return {
        ...state,
        ...action.data
      };
    case ActionType.CLEAR_POST_STATE:
      return initState;
    default:
      return {
        ...state
      };
  }
};
