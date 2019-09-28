import React from 'react';
import Head from 'next/head';
import LayoutHeader from '../../../component/layout/header';
import LayoutFooter from '../../../component/layout/footer';
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
export default class NoticeDetail extends React.Component<Props, State> {
  public static getInitialProps = async ({ query }: any) => {
    // 获取文章 id
    const id: string = query.id;

    return {
      id
    };
  };

  public render = (): JSX.Element => {
    const { props } = this;
    return (
      <section className="app-container">
        <LayoutHeader/>
        <Head>
          <title>文章详情</title>
        </Head>
        <section className="article-container">
          <section className="article-wrapper-container">
            <section className="article-wrapper-inner-container">
              {props.id}
            </section>
          </section>
        </section>
        <LayoutFooter/>
      </section>
    );
  };
}
