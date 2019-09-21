import React from 'react';
import Head from 'next/head';
import './index.less';

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
export default class LayoutHeader extends React.Component<Props, State> {
  render = (): JSX.Element => {
    return (
      <section className="layout-header-container">
        <Head>
          <title>默认标题</title>
        </Head>
        header
      </section>
    );
  };
};
