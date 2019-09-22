import React from 'react';
import LayoutHeader from '../../component/layout/header';
import LayoutFooter from '../../component/layout/footer';
import './index.less';
import Head from 'next/head';

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  render = (): JSX.Element => {
    return (
      <section className="app-container">
        <LayoutHeader/>
        <Head>
          <title>混沌论坛 - 首页</title>
        </Head>
        <section className="home-container">
          首页
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}
