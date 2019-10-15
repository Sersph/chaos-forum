import React from 'react';
import LayoutMaster from '../../component/_layout/master';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import HTMLParseReact from 'html-react-parser';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NProgress from 'nprogress';
import ImageZoom from 'react-medium-image-zoom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Tinymce from '../../component/tinymce';
import Button from '@material-ui/core/Button';
import browser from '../../util/browser';
import { updatePostDetail, updateAgreePostIdList } from '../../store/post';
import api from '../../api';
import Router from 'next/router';
import './index.less';
import { AppState } from '../../type/state';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
  postDetail: any;
  agreePostIdList: any;
}

interface ConnectDispatch {
  updateAgreePostIdList: (data: any) => object;
  updatePostDetail: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
  // 查询失败
  error: boolean;
  // 留言
  postMessageList: any;
  // 留言搜索条件
  postMessageListSelectCondition: any;
}

interface State {
  // 回复内容
  insertPostMessageContent: string;
  // 回复loading
  insertPostMessageFormSubmitted: boolean;
  // 加载
  loadingStatus: boolean;
  // 加载预览数组
  loadingArr: number[];

  // 删除回复id
  deletePostMessageId: any;
  // 删除回复模态框
  visibleDeletePostMessageModel: boolean;

  // 删除文章id
  deletePostId: any;
  // 删除文章模态框
  visibleDeletePostModel: boolean;
  // 已经删除文章
  isDeletePost: boolean;

  // 提示
  snackbarMessage: string;
  snackbarStatus: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: AppState) => ({
      postDetail: state.post.postDetail,
      userInfo: state.account.userInfo,
      agreePostIdList: state.post.agreePostIdList
    }),
    {
      updateAgreePostIdList,
      updatePostDetail
    }
  )
)(
  class PostDetail extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        deletePostId: 0,
        deletePostMessageId: 0,
        insertPostMessageContent: '',
        insertPostMessageFormSubmitted: false,
        visibleDeletePostMessageModel: false,
        visibleDeletePostModel: false,
        isDeletePost: false,
        loadingStatus: false,
        loadingArr: [0, 0, 0, 0, 0],
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    public static getInitialProps = async ({ query, store }: any) => {
      const postId = query.id ? parseInt(query.id) : '';
      const currentPage = query.page ? parseInt(query.page) : 1;

      // 请求接口
      let result1 = null;
      if (store.getState().post.postDetail !== null && store.getState().post.postDetail.id === postId) {
        result1 = store.getState().post.postDetail;
      } else {
        result1 = api.post.selectPost(postId);
      }

      let postMessageListSelectCondition: any = {
        page: currentPage,
        pageSize: 10
      };
      let result2: any = api.post.selectPostMessage(postId, postMessageListSelectCondition);

      // 等待响应
      if (result1 instanceof Promise) {
        result1 = await result1;

        // 有错直接返回
        if (result1.data.records.length === 0) {
          return {
            error: true
          };
        }

        // 保存查询结果
        if (result1.data.records.length > 0) {
          store.dispatch(updatePostDetail(result1.data.records[0]));
        }
      }
      result2 = await result2;

      if (result2.code === 0) {
        postMessageListSelectCondition = {
          ...postMessageListSelectCondition,
          count: result2.data.total || 0
        };
      }

      return {
        postMessageList: result2.data.records,
        postMessageListSelectCondition
      };
    };

    public componentDidMount = (): void => {
      window.addEventListener('popstate', this.handlerRouterChangeStart);
    };

    public componentWillUnmount = (): void => {
      window.removeEventListener('popstate', this.handlerRouterChangeStart);
    };

    public shouldComponentUpdate = (nextProps: any): boolean => {
      const { props } = this;
      setTimeout(() => {
        // 接收到新的列表 取消加载状态
        if (props.postMessageList !== nextProps.postMessageList) {
          this.setState({
            loadingStatus: false
          });
        }
      }, 150);
      return true;
    };

    public handlerRouterChangeStart = (event: any): void => {
      // 显示加载状态
      if (event.state.as.substring(0, 5) === '/post') {
        this.setState({
          loadingStatus: true
        });
      }
    };

    // 分页数据改变 - 第几页
    public handleChangePage = (_event: any, newPage: number): void => {
      const { props } = this;

      NProgress.start();

      this.setState({
        loadingStatus: true
      });

      browser.scrollToTop(100);

      setTimeout(() => {
        Router.push(`/post?id=${props.postDetail.id}&page=${newPage + 1}`, `/post/${props.postDetail.id}?page=${newPage + 1}`);
      }, 100);
    };

    // 创建帖子表单提交
    public handleInsertPostMessageFormDataSubmit = async () => {
      const { props, state } = this;
      this.setState({
        insertPostMessageFormSubmitted: true
      });

      NProgress.start();

      const postData = {
        articleId: props.postDetail.id,
        content: state.insertPostMessageContent
      };

      const result: any = await api.post.insertPostMessage(postData);

      if (result.code === 0) {
        setTimeout(() => {
          this.setState({
            loadingStatus: true
          });

          browser.scrollToTop(100);

          setTimeout(() => {
            // 清空文本框数据，隐藏模态框
            this.setState({
              insertPostMessageContent: '',
              insertPostMessageFormSubmitted: false
            });

            // 清空文本框数据
            ((window as any).tinyMCE).activeEditor.setContent('');

            setTimeout(() => {
              Router.push(`/post?id=${props.postDetail.id}`, `/post/${props.postDetail.id}`);
            }, 100);

          }, 100);
        }, 1000);
      } else if (result.code === 108) {
        this.setState({
          snackbarMessage: '请登录后在进行此操作',
          snackbarStatus: true
        });
        NProgress.done();
      }
    };

    // 显示/隐藏删除评论模态框
    public handleToggleDeletePostMessageModel = (flag: boolean): void => {
      this.setState({
        visibleDeletePostMessageModel: flag
      });
    };

    // 显示隐藏 删除文章模态框
    public handleToggleDeletePostModel = (flag: boolean): void => {
      this.setState({
        visibleDeletePostModel: flag
      });
    };

    // 删除回复方法
    public deletePostMessage = async () => {
      const { props, state } = this;
      NProgress.start();

      setTimeout(async () => {
        await api.post.deletePostMessage(state.deletePostMessageId);

        Router.replace(`/post?id=${props.postDetail.id}&page=${props.postMessageListSelectCondition.page}`, `/post/${props.postDetail.id}?page=${props.postMessageListSelectCondition.page}`);

        this.handleToggleDeletePostMessageModel(false);

        NProgress.done();
      }, 500);
    };

    // 删除文章
    public deletePost = async () => {
      const { props, state } = this;
      NProgress.start();

      setTimeout(async () => {
        await api.post.deletePost(state.deletePostId);

        this.setState({
          isDeletePost: true
        });

        this.handleToggleDeletePostModel(false);

        NProgress.done();
      }, 500);
    };

    // 文章点赞方法
    public agreePost = async (postId: any) => {
      const { props } = this;

      // 判断是否登录
      if (props.userInfo.username === undefined) {
        this.setState({
          snackbarMessage: '请登录后在进行此操作',
          snackbarStatus: true
        });
        return;
      }

      NProgress.start();

      const status = props.agreePostIdList.includes(postId) ? 0 : 1;

      // 点赞 / 取消点赞接口
      await api.post.agreePost({
        status,
        articleId: postId
      });

      // 更新 redux
      let newAgreePostIdList = [];
      if (status == 1) {
        newAgreePostIdList = [
          ...props.agreePostIdList,
          postId
        ];
      } else {
        newAgreePostIdList = props.agreePostIdList.filter((item: any) => item !== postId);
      }
      props.updateAgreePostIdList(newAgreePostIdList);

      const newPostDetail = {
        ...props.postDetail
      };
      newPostDetail.totalLike = status === 1 ?
        props.postDetail.totalLike + 1 :
        props.postDetail.totalLike - 1;
      props.updatePostDetail(newPostDetail);

      NProgress.done();
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return !props.error && !state.isDeletePost ? (
        <section className="post-container">
          <Head>
            <title>{props.postDetail.title} - {props.postDetail.articleCategoryName}</title>
          </Head>
          <LayoutMaster>
            <Container maxWidth="lg">
              <section className="post-detail-container">
                <section className="post-title">
                  <Typography noWrap>{props.postDetail.title}</Typography>
                  <Fab variant="extended" color="primary" onClick={() => {
                    window.scrollTo(0, (document.querySelector('.message-replay-container') as any).offsetTop);
                  }}>
                    <EditIcon/>回复
                  </Fab>
                </section>
                {state.loadingStatus ? (
                  <div className="post-message-loading-container">
                    {state.loadingArr.map((_n, index) => (
                      <div className="loading-item-container" key={index}>
                        <div>
                          <Skeleton variant="circle" width={85} height={85}/>
                          <Skeleton variant="rect" width={85} height={15}/>
                        </div>
                        <div>
                          <Skeleton variant="rect" height={155}/>
                          <Skeleton/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <section>
                    {/* 帖子内容 */}
                    {props.postMessageListSelectCondition.page === 1 && (
                      <section className="post-detail-wrapper">
                        <section className="user-content">
                          <img
                            src={(props.postDetail.buddha !== undefined && props.postDetail.buddha !== '') ? props.postDetail.buddha : '../../../static/image/person-default-avatar.jpg'}
                          />
                          <Typography className="username">{props.postDetail.creatorUsername}</Typography>
                        </section>
                        <section className="post-content-and-description">
                          <section className="post-content">
                            {HTMLParseReact(props.postDetail.content, {
                              replace: (domNode: any) => {
                                if (domNode.type === 'tag' && domNode.name == 'img') {
                                  return (
                                    <ImageZoom
                                      zoomMargin={50}
                                      defaultStyles={{
                                        zoomContainer: {
                                          zIndex: 1202
                                        }
                                      }}
                                      shouldReplaceImage={false}
                                      image={{
                                        src: domNode.attribs.src,
                                        alt: domNode.attribs.src
                                      }}
                                      zoomImage={{
                                        src: domNode.attribs.src,
                                        alt: domNode.attribs.src
                                      }}
                                    />
                                  );
                                }
                              }
                            })}
                          </section>
                          <section className="post-description">
                            <section
                              className={`${props.agreePostIdList.includes(props.postDetail.id) ? 'active' : ''}`}
                              onClick={() => this.agreePost(props.postDetail.id)}>
                              <i className="agree active"/>
                              <Typography className="like-count">{props.postDetail.totalLike}</Typography>
                            </section>
                            <section>
                              <Typography className="create-time" noWrap>
                                {props.userInfo.id && (parseInt(props.userInfo.id) === parseInt(props.postDetail.creatorId)) && (
                                  <span
                                    className="delete-post"
                                    onClick={() => {
                                      this.setState({
                                        deletePostId: props.postDetail.id
                                      });
                                      this.handleToggleDeletePostModel(true);
                                    }}
                                  >删除 | </span>
                                )}
                                <span>{props.postDetail.createTime}</span>
                              </Typography>
                            </section>
                          </section>
                        </section>
                      </section>
                    )}
                    {/* 回复内容 */}
                    {props.postMessageList.length > 0 ? (
                      <section className="post-message">
                        {props.postMessageList.map((messageItem: any, index: number) => (
                          <section className="post-message-item" key={index}>
                            <section className="user-content">
                              <img
                                src={(messageItem.buddha !== undefined && messageItem.buddha !== '') ? messageItem.buddha : '../../../static/image/person-default-avatar.jpg'}
                              />
                              <Typography className="username">{messageItem.username}</Typography>
                            </section>
                            <section className="post-content-and-description">
                              <section className="post-content">
                                {HTMLParseReact(messageItem.content, {
                                  replace: (domNode: any) => {
                                    if (domNode.type === 'tag' && domNode.name == 'img') {
                                      return (
                                        <ImageZoom
                                          zoomMargin={50}
                                          defaultStyles={{
                                            zoomContainer: {
                                              zIndex: 1202
                                            }
                                          }}
                                          shouldReplaceImage={false}
                                          image={{
                                            src: domNode.attribs.src,
                                            alt: domNode.attribs.src
                                          }}
                                          zoomImage={{
                                            src: domNode.attribs.src,
                                            alt: domNode.attribs.src
                                          }}
                                        />
                                      );
                                    }
                                  }
                                })}
                              </section>
                              <section className="post-description">
                                <section/>
                                <section>
                                  <Typography className="message-id">
                                    {props.userInfo.id && (parseInt(props.userInfo.id) === parseInt(messageItem.userId)) && (
                                      <span
                                        className="delete-message"
                                        onClick={() => {
                                          this.setState({
                                            deletePostMessageId: messageItem.id
                                          });
                                          this.handleToggleDeletePostMessageModel(true);
                                        }}
                                      >删除 | </span>
                                    )}
                                    <span>{index + 1}楼</span>
                                  </Typography>
                                  <Typography className="create-time" noWrap>{messageItem.createTime}</Typography>
                                </section>
                              </section>
                            </section>
                          </section>
                        ))}
                        <TablePagination
                          labelRowsPerPage="每页显示条数"
                          rowsPerPageOptions={[10, 15, 20]}
                          component="div"
                          count={props.postMessageListSelectCondition.count}
                          rowsPerPage={props.postMessageListSelectCondition.pageSize}
                          page={props.postMessageListSelectCondition.page - 1}
                          onChangePage={this.handleChangePage}
                        />
                      </section>
                    ) : (
                      <section className="no-message">暂无任何评论...</section>
                    )}
                  </section>
                )}

                {/* 回复区 */}
                <section className="message-replay-container">
                  <Typography className="reply">发表回复</Typography>
                  <ValidatorForm
                    onSubmit={this.handleInsertPostMessageFormDataSubmit}
                  >
                    {/*
                    // @ts-ignore*/}
                    <Tinymce
                      ref="tinymce"
                      value={state.insertPostMessageContent}
                      onEditorChange={(value) => {
                        this.setState({
                          insertPostMessageContent: value
                        });
                      }}
                    />
                    <div className="submit-button-container">
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={state.insertPostMessageFormSubmitted}
                      >发表</Button>
                    </div>
                  </ValidatorForm>
                </section>
              </section>
            </Container>
          </LayoutMaster>
          {/* 删除文章 */}
          <Dialog
            open={state.visibleDeletePostModel}
            maxWidth="md"
            onClose={() => this.handleToggleDeletePostModel(false)}
            scroll="body"
          >
            <DialogContent className="delete-post-dialog-content">
              <Typography>确认删除这条帖子?</Typography>
              <section className="action-container">
                <Button color="primary"
                        variant="outlined"
                        onClick={() => this.deletePost()}
                >确定</Button>
                <Button color="primary"
                        variant="outlined"
                        onClick={() => this.handleToggleDeletePostModel(false)}
                >取消</Button>
              </section>
            </DialogContent>
          </Dialog>
          {/* 删除回复 */}
          <Dialog
            open={state.visibleDeletePostMessageModel}
            maxWidth="md"
            onClose={() => this.handleToggleDeletePostMessageModel(false)}
            scroll="body"
          >
            <DialogContent className="delete-message-dialog-content">
              <Typography>确认删除这条回复?</Typography>
              <section className="action-container">
                <Button color="primary"
                        variant="outlined"
                        onClick={() => this.deletePostMessage()}
                >确定</Button>
                <Button color="primary"
                        variant="outlined"
                        onClick={() => this.handleToggleDeletePostMessageModel(false)}
                >取消</Button>
              </section>
            </DialogContent>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={state.snackbarStatus}
            autoHideDuration={1000}
            message={<span>{state.snackbarMessage}</span>}
            onClose={() => {
              this.setState({
                snackbarStatus: false
              });
            }}
            action={[
              <IconButton
                key="1"
                color="inherit"
                onClick={() => {
                  this.setState({
                    snackbarStatus: false
                  });
                }}
              >
                <CloseIcon/>
              </IconButton>,
            ]}
          />
        </section>
      ) : (
        <LayoutMaster>
          <Head>
            <title>当前浏览的文章不存在</title>
          </Head>
          <Container maxWidth="lg">
            <section className="post-detail-container">
              <section className="select-post-error-container">
                当前浏览的文章不存在...
                <section>
                  <Link href="/home">
                    <a href="/home">
                      <Typography noWrap>
                        前往首页
                      </Typography>
                    </a>
                  </Link>
                </section>
              </section>
            </section>
          </Container>
        </LayoutMaster>
      );
    };
  }
);
