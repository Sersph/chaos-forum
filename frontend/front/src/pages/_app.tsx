import React from 'react';
import App from 'next/app';
import { withRouter } from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../component/material-ui/theme';
import Router from 'next/router';
import api from '../api';
import { updateUserInfo } from '../store/account';

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
interface Props {
  store: any;
  error: any;
}

// 当前组件类
export default withReduxStore(
  withRouter(
    class _app extends App<Props> {
      public componentDidMount = async () => {
        const { props } = this;

        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
          jssStyles.parentNode!.removeChild(jssStyles);
        }

        // 监听路由显示顶部加载条
        Router.events.on('routeChangeStart', () => NProgress.start());
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());

        // 更新用户状态
        // 初始化用户登陆信息(因为每个页面都可能需要用到) (全局只需获取一次, 从 redux 中获取, 如果获取了就无需再次获取)
        if (props.store.getState().account.userInfo.isGet === undefined) {
          let result1: any = await api.account.selectUserInfo();
          let userInfo: any = {};
          if (parseInt(result1.code) === 0) {
            userInfo = result1.data;
          }
          // 保存登陆状态到 redux
          props.store.dispatch(updateUserInfo(userInfo));
        }
      };

      public render = (): JSX.Element => {
        const { props } = this;
        const { Component, pageProps, store, error } = props;
        if (error) {
          return (
            <section className="error-container">发送未知错误</section>
          );
        } else {
          return (
            <React.Fragment>
              <ThemeProvider theme={theme}>
                {/* material 初始化样式 */}
                <CssBaseline/>
                <Provider store={store}>
                  <Component {...pageProps}/>
                </Provider>
              </ThemeProvider>
            </React.Fragment>
          );
        }
      };
    }
  )
);
