import React from 'react';
import ReactDOM from 'react-dom';
// react-redux 高阶组件
import { Provider } from 'react-redux';
// redux store 对象
import store from './store';
// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
// 根组件
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
