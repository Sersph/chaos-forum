import React from 'react';
import App, { Container } from 'next/app';
import { withRouter, WithRouterProps } from 'next/router';
import NProgress from 'nprogress';

// ie11 兼容
import '@babel/polyfill';

// react-redux 高阶组件
import { Provider } from 'react-redux';
import withReduxStore from '../util/with-redux-store';

// 全局 css
import 'normalize.css';
import 'nprogress/nprogress.css';
import './_app.less';

// NProgress 配置
NProgress.configure({
  minimum: 0.35,
  easing: 'ease-in',
  speed: 233,
  trickle: true,
  trickleSpeed: 65,
  showSpinner: false
});

// 当前组件类型声明
interface Props extends WithRouterProps {
  store: any;
  error: any;
}

// 当前组件类
export default withRouter(
  withReduxStore(
    class _app extends App<Props> {
      render = (): JSX.Element => {
        const { props } = this;
        const { Component, pageProps, store, error } = props;
        if (error) {
          return (
            <div>发送未知错误</div>
          );
        } else {
          return (
            <Container>
              <Provider store={store}>
                <Component {...pageProps}/>
              </Provider>
            </Container>
          );
        }
      };
    }
  )
);
