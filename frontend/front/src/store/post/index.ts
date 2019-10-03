import { PostState } from '../../type/state';

// action type
enum ActionType {
  UPDATE_POST_CATEGORY_PAGE_POST_CATEGORY_DETAIL = 'updatePostCategoryPagePostCategoryDetail',
  CLEAR_POST_STATE = 'clearPostState'
}

// state
const initState: PostState = {
  postCategoryPagePostCategoryDetail: null
};

// action
// 是否已经获取帖子分类详情
export const updatePostCategoryPagePostCategoryDetail = (flag: boolean): object => {
  return {
    type: ActionType.UPDATE_POST_CATEGORY_PAGE_POST_CATEGORY_DETAIL,
    data: {
      postCategoryPagePostCategoryDetail: flag
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
    case ActionType.UPDATE_POST_CATEGORY_PAGE_POST_CATEGORY_DETAIL:
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
