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
export default class PostCategory extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="post-category-container">
        <Head>
          <title>混沌论坛 - 全部分区</title>
        </Head>
        <LayoutMaster>
          233
        </LayoutMaster>
      </section>
    );
  };
}
