import React from 'react';
import LayoutMaster from '../../component/_layout/master';
import Head from 'next/head';
import api from '../../api';
import './index.less';

// 当前组件的类型声明
interface Props {
  // 帖子详情
  postDetail: any;
}

interface State {
  // 帖子详情
  postDetail: any;
}

// 当前组件类
export default class PostDetail extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      postDetail: {},
    };
  }

  public static getInitialProps = async () => {
    const result: any = await api.post.selectHotPostList({});



    return {
    };
  };

  public render = (): JSX.Element => {
    const { props, state } = this;
    return (
      <section className="post-detail-container">
        <Head>
          <title>混沌论坛 - 帖子详情</title>
        </Head>
        <LayoutMaster>
          123
        </LayoutMaster>
      </section>
    );
  };
}
