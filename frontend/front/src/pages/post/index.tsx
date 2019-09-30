import React from 'react';
import Head from 'next/head';
import LayoutMaster from '../../component/_layout/master';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
  id: number;
}

interface State {
}

// 当前组件类
export default class PostDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取帖子 id
    const id: string = query.id;

    return {
      id
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <Head>
          <title>帖子详情</title>
        </Head>
        <section className="post-detail-container">
          <section className="post-detail-wrapper-container">
            <section className="post-detail-wrapper-inner-container">
              {props.id}
            </section>
          </section>
        </section>
      </section>
    );
  };
}
