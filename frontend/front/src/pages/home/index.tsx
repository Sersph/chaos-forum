import React from 'react';
import LayoutMaster from '../../component/_layout/master';
import Head from 'next/head';
import HotPostPostListItem from '../../component/post/hot-post-post-list-item';
import Container from '@material-ui/core/Container';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import api from '../../api';
import './index.less';

// 当前组件的类型声明
interface Props {
  // 热门帖子列表, 服务端数据
  postList: any[];
}

interface State {
  // 是否触发加载更多
  loadingTrigger: boolean;
  // 热门帖子列表, 客户端数据
  postList: any[];
  // 是否为客户端渲染
  isServerRender: boolean;
}

// 当前组件类
export default class Home extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      loadingTrigger: true,
      postList: [],
      isServerRender: true
    };
  }

  public static getInitialProps = async () => {
    // 获取热门帖子列表
    const result: any = await api.post.selectHotPostList({
      page: 0,
      pageSize: 10
    });

    let postList = [];
    if (result.code === 0) {
      postList = result.data.records;
    }

    // 返回数据
    return {
      postList
    };
  };

  /**
   * 下拉加载数据
   *
   *
   */
  public loadPostDescriptionData = async (event) => {
    // 如果此方法调用，说明已经是客户端渲染
    const { state, props } = this;
    setTimeout(async () => {
      const result: any = await api.post.selectHotPostList({
        page: event,
        pageSize: 10
      });
      if (result.code === 0) {
        if (state.isServerRender) {
          // 如果客户端是第一次调用，需要把 props 的数据存入
          this.setState({
            postList: [
              ...props.postList,
              ...result.data.records
            ],
            isServerRender: false
          });
        } else {
          // 如果客户端不是第一次调用，直接合并 state 的数据
          this.setState({
            postList: [
              ...state.postList,
              ...result.data.records
            ]
          });
        }
      }
    }, 1000);
  };

  public render = (): JSX.Element => {
    const { props, state } = this;
    return (
      <section className="home-container">
        <Head>
          <title>混沌论坛</title>
        </Head>
        <LayoutMaster>
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadPostDescriptionData}
            hasMore={state.loadingTrigger}
            loader={<CircularProgress className="loading" key={0}/>}
          >
            <section className="post-list-container">
              <Container maxWidth="sm" className="post-list-wrapper-container">
                <Typography variant="h5" noWrap className="hot">每日热门帖子</Typography>
                <section className="post-list">
                  {/* 首次刷新页面使用服务点渲染，后续使用客户端异步获取数据渲染 */}
                  {state.isServerRender
                    ? props.postList.map((postListItem, index) => (
                      <HotPostPostListItem key={index} postDescription={postListItem}/>
                    ))
                    : state.postList.map((postListItem, index) => (
                      <HotPostPostListItem key={index} postDescription={postListItem}/>
                    ))}
                </section>
              </Container>
            </section>
          </InfiniteScroll>
        </LayoutMaster>
      </section>
    );
  };
}
