import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import account from './account';
import post from './post';

// 暴露 store 对象
export function initializeStore(initialState: any) {
  return createStore(
    // 封装 reducer 集合
    combineReducers({
      account,
      post
    }),
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
}
