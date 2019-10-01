import React from 'react';
import LayoutMaster from '../../component/_layout/master';
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
  public render = (): JSX.Element => {
    return (
      <section className="home-container">
        <Head>
          <title>混沌论坛 - 混沌社区,复读机爱好者的聚集地</title>
        </Head>
        <LayoutMaster>
          123
        </LayoutMaster>
      </section>
    );
  };
}
