import React from 'react';
import LayoutMaster from '../../component/_layout/master';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import HTMLParseReact from 'html-react-parser';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import NProgress from 'nprogress';
import ImageZoom from 'react-medium-image-zoom';
import Tinymce from '../../component/tinymce';
import Button from '@material-ui/core/Button';
import browser from '../../util/browser';
import { updatePostDetail } from '../../store/post';
import api from '../../api';
import Router from 'next/router';
import './index.less';

// 当前组件的类型声明
interface Props {
  // 帖子详情
  postDetail: any;
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

  // 提示
  snackbarMessage: string;
  snackbarStatus: boolean;
}

// 当前组件类
export default class PostDetail extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      insertPostMessageContent: '',
      insertPostMessageFormSubmitted: false,
      loadingStatus: false,
      loadingArr: [0, 0, 0, 0, 0],
      snackbarMessage: '',
      snackbarStatus: false
    };
  }

  public static getInitialProps = async ({ query, store }) => {
    const postId = query.id ? query.id : '';
    const currentPage = query.page ? parseInt(query.page) : 1;

    // 请求接口
    let result1 = null;
    // if (store.getState().post.postDetail !== null && store.getState().post.postDetail.id == postId) {
    if (store.getState().post.postDetail !== null) {
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
      // 保存查询结果
      store.dispatch(updatePostDetail(result1));
    }
    result2 = await result2;

    // 处理响应
    // 有错直接返回
    if (result1.data.records.length === 0) {
      return {
        error: true
      };
    }

    if (result2.code === 0) {
      postMessageListSelectCondition = {
        ...postMessageListSelectCondition,
        count: result2.data.total || 0
      };
    }

    return {
      postDetail: result1.data.records[0],
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

  public shouldComponentUpdate = (nextProps): boolean => {
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

  public handlerRouterChangeStart = (event): void => {
    // 显示加载状态
    if (event.state.as.substring(0, 5) === '/post') {
      this.setState({
        loadingStatus: true
      });
    }
  };

  // 分页数据改变 - 第几页
  public handleChangePage = (event, newPage: number): void => {
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

  public render = (): JSX.Element => {
    const { props, state } = this;
    return !props.error ? (
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
                  {state.loadingArr.map((n, index) => (
                    <div className="loading-item-container" key={index}>
                      <div>
                        <Skeleton variant="circle" width={90} height={90}/>
                      </div>
                      <div>
                        <Skeleton width="15%" height={29}/>
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
                        <Typography className="username">{props.postDetail.username}</Typography>
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
                          <section>
                            <i className="agree active"/>
                            <Typography className="like-count">0</Typography>
                          </section>
                          <section>
                            <Typography className="create-time">{props.postDetail.createTime}</Typography>
                          </section>

                        </section>
                      </section>
                    </section>
                  )}
                  {/* 回复内容 */}
                  {props.postMessageList.length > 0 ? (
                    <section className="post-message">
                      {props.postMessageList.map((messageItem, index) => (
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
                                <Typography className="message-id">{messageItem.id}楼</Typography>
                                <Typography className="create-time">{messageItem.createTime}</Typography>
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
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={state.snackbarStatus}
          TransitionComponent={Slide}
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
        <Container maxWidth="lg">
          <section className="post-detail-container">
            <section className="select-post-error-container">查询文章失败...</section>
          </section>
        </Container>
      </LayoutMaster>
    );
  };
}
