import React from 'react';
import LayoutMaster from '../../component/_layout/master';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Router from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../api';
import browser from '../../util/browser';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import NProgress from 'nprogress';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import { updateAllPostCategory } from '../../store/post';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../type/state';
import PostCategoryPostListItem from '../../component/post/post-category-post-list-item';
import Tinymce from '../../component/tinymce';
import htmlUtil from '../../util/html';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
  // 帖子搜索条件
  postListSelectCondition: any;
  // 帖子数据, 服务端数据
  postList: any;
  // 帖子分类详情
  allPostCategoryList: any;
  // 路由信息
  router: any;
  // redux
  store: any;
}

interface State {
  // 加载
  loadingStatus: boolean;
  // 加载预览数组
  loadingArr: number[];

  // 创建文章模态框显示/隐藏
  visibleInsertPostModel: boolean;
  // 创建帖子表单数据
  insertPostFormData: {
    title: string;
    postCategoryId: number;
  };
  // 创建帖子内容
  insertPostContent: string;
  // 创建帖子按钮加载
  insertPostFormSubmitted: boolean;

  // 帖子搜索条件
  postListSelectCondition: any;
  // 通知
  snackbarMessage: string;
  snackbarStatus: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: AppState) => ({
      userInfo: state.account.userInfo
    }),
    {}
  ),
  withRouter
)(
  class Home extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        loadingStatus: false,
        loadingArr: [0, 0, 0, 0, 0],

        visibleInsertPostModel: false,
        insertPostFormData: {
          title: '',
          postCategoryId: 0
        },
        insertPostContent: '',
        insertPostFormSubmitted: false,

        postListSelectCondition: {
          postCategoryId: props.postListSelectCondition.postCategoryId,
          title: props.postListSelectCondition.title
        },
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    public static getInitialProps = async ({ query, store }) => {
      const postCategoryId = query.postCategoryId ? parseInt(query.postCategoryId) : 0;
      const title = query.title ? query.title : '';
      const currentPage = query.page ? parseInt(query.page) : 1;
      const currentPageSize = query.pageSize ? parseInt(query.pageSize) : 10;

      // 请求
      // 是否已经获取全部分类, 获取过则不获取
      let result1 = null;
      let reduxAllPostCategoryList = store.getState().post.allPostCategoryList;
      if (reduxAllPostCategoryList !== null) {
        result1 = reduxAllPostCategoryList;
      } else {
        result1 = api.post.selectAllPostCategoryList();
      }

      // 获取分类帖子列表
      const postListSelectQuery: any = {
        page: currentPage,
        pageSize: currentPageSize
      };
      if (title !== '') {
        postListSelectQuery.title = title;
      }
      if (postCategoryId !== 0) {
        postListSelectQuery.articleCategoryId = postCategoryId;
      }
      let result2: any = api.post.selectPostList(postListSelectQuery);

      // 等待响应完成
      if (result1 instanceof Promise) {
        result1 = await result1;
        result1.data.unshift({
          id: 0,
          name: '全部分区'
        });
        store.dispatch(updateAllPostCategory(result1));
      }

      result2 = await result2;

      // 处理响应
      let allPostCategoryList = [];
      if (result1.code === 0) {
        allPostCategoryList = result1.data;
      }

      let postList = {
        records: []
      };
      let postListSelectCondition = {
        postCategoryId,
        title,
        count: 0,
        page: currentPage,
        pageSize: currentPageSize
      };
      if (result2.code === 0) {
        postList = {
          records: result2.data.records
        };
        postListSelectCondition = {
          ...postListSelectCondition,
          count: result2.data.total || 0
        };
      }

      // 返回数据
      return {
        allPostCategoryList,
        postList,
        postListSelectCondition
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
        if (props.postList !== nextProps.postList) {
          this.setState({
            loadingStatus: false
          });
        }
      }, 150);
      return true;
    };

    public componentDidUpdate = (prevProps) => {
      const { props, state } = this;
      // 路由参数不一致，更新查询参数
      if (prevProps.postListSelectCondition.title !== props.postListSelectCondition.title) {
        this.setState({
          postListSelectCondition: {
            ...state.postListSelectCondition,
            title: props.postListSelectCondition.title
          }
        });
      }
      if (prevProps.postListSelectCondition.postCategoryId !== props.postListSelectCondition.postCategoryId) {
        this.setState({
          postListSelectCondition: {
            ...state.postListSelectCondition,
            postCategoryId: props.postListSelectCondition.postCategoryId
          }
        });
      }
    };

    public handlerRouterChangeStart = (event): void => {
      // 显示加载状态
      if (event.state.as.substring(0, 5) === '/home') {
        this.setState({
          loadingStatus: true
        });
      }
    };

    // 分页数据改变 - 第几页
    public handleChangePage = (event, newPage: number): void => {
      const { props, state } = this;

      NProgress.start();

      this.setState({
        loadingStatus: true
      });

      browser.scrollToTop(100);

      setTimeout(() => {
        const query: any = {
          page: newPage + 1,
          pageSize: props.postListSelectCondition.pageSize
        };
        if (state.postListSelectCondition.postCategoryId !== 0) {
          query.postCategoryId = state.postListSelectCondition.postCategoryId;
        }
        if (state.postListSelectCondition.title !== '') {
          query.title = state.postListSelectCondition.title;
        }
        Router.push({
          pathname: '/home',
          query
        });
      }, 100);
    };

    // 分页数据改变 - 每页多少条
    public handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { state } = this;

      NProgress.start();

      this.setState({
        loadingStatus: true
      });

      browser.scrollToTop(100);

      setTimeout(() => {
        const query: any = {
          page: 1,
          pageSize: event.target.value
        };
        if (state.postListSelectCondition.postCategoryId !== 0) {
          query.postCategoryId = state.postListSelectCondition.postCategoryId;
        }
        if (state.postListSelectCondition.title !== '') {
          query.title = state.postListSelectCondition.title;
        }
        Router.push({
          pathname: '/home',
          query
        });
      }, 100);
    };

    // 表单数据改变
    public handleInsertPostFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        insertPostFormData: {
          ...state.insertPostFormData,
          [event.target.name]: event.target.value
        }
      });
    };

    // 创建帖子表单提交
    public handleInsertPostFormDataSubmit = async () => {
      const { state } = this;
      this.setState({
        insertPostFormSubmitted: true
      });

      NProgress.start();

      // 生成预览图
      const previewImageList = [];
      const nodeList = htmlUtil.parseHtmlStrToNodeList(state.insertPostContent);
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].tagName !== undefined && nodeList[i].tagName.toLowerCase() === 'p') {
          const pNodeList = nodeList[i].children;
          for (let j = 0; j < pNodeList.length; j++) {
            if (pNodeList[j].tagName.toLowerCase() === 'img') {
              previewImageList.push({
                thumbnail: pNodeList[j].dataset.thumbnail,
                original: pNodeList[j].src
              });
            }
          }
        }
      }

      const postData = {
        title: state.insertPostFormData.title,
        content: state.insertPostContent,
        articleCategoryId: state.insertPostFormData.postCategoryId,
        preview: JSON.stringify(previewImageList)
      };

      const result: any = await api.post.insertPost(postData);

      if (result.code === 0) {
        setTimeout(() => {
          this.setState({
            loadingStatus: true
          });

          browser.scrollToTop(100);

          setTimeout(() => {
            // 清空文本框数据，隐藏模态框
            this.setState({
              insertPostFormData: {
                postCategoryId: 0,
                title: ''
              },
              insertPostContent: '',
              insertPostFormSubmitted: false,
              visibleInsertPostModel: false
            });

            // 清空文本框数据
            ((window as any).tinyMCE).activeEditor.setContent('');

            Router.push({
              pathname: '/home'
            });
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

    // 显示/隐藏创建文章模态框
    public handleToggleUploadModel = (flag: boolean): void => {
      const { props } = this;
      // 判断用户是否登录
      if (props.userInfo.username !== undefined) {
        this.setState({
          visibleInsertPostModel: flag
        });
      } else {
        this.setState({
          snackbarMessage: '请登录后在进行此操作',
          snackbarStatus: true
        });
      }
    };

    // 创建帖子取消按钮
    public handleCancel = (): void => {
      this.setState({
        visibleInsertPostModel: false
      });
    };

    // 帖子查询表单数据改变
    public handleSelectPostFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        postListSelectCondition: {
          ...state.postListSelectCondition,
          [event.target.name]: event.target.value
        }
      });
    };

    // 帖子查询帖子表单提交
    public handleSelectPostFormDataSubmit = async () => {
      const { state } = this;

      NProgress.start();

      this.setState({
        loadingStatus: true
      });

      const query: any = {};
      if (state.postListSelectCondition.title !== '') {
        query.title = state.postListSelectCondition.title;
      }
      if (state.postListSelectCondition.postCategoryId !== 0) {
        query.postCategoryId = state.postListSelectCondition.postCategoryId;
      }
      Router.push({
        pathname: '/home',
        query
      });
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="home-container">
          <Head>
            <title>混沌论坛 - 网络上的小社区</title>
          </Head>
          <LayoutMaster>
            <section className="post-list-container">
              <Container maxWidth="lg">
                <div className="header-action">
                  <Fab variant="extended" color="primary" onClick={() => this.handleToggleUploadModel(true)}>
                    <EditIcon/>我要发帖
                  </Fab>
                </div>
                {/* 帖子搜索条件 */}
                <section className="post-select-condition">
                  <ValidatorForm
                    onSubmit={this.handleSelectPostFormDataSubmit}
                  >
                    <SelectValidator
                      fullWidth
                      margin="dense"
                      label="帖子分区"
                      onChange={this.handleSelectPostFormDataChange}
                      name="postCategoryId"
                      value={state.postListSelectCondition.postCategoryId === 0 ? '' : state.postListSelectCondition.postCategoryId}
                      variant="outlined"
                    >
                      {props.allPostCategoryList.map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))}
                    </SelectValidator>
                    <TextValidator
                      fullWidth
                      margin="dense"
                      label="帖子标题"
                      onChange={this.handleSelectPostFormDataChange}
                      name="title"
                      type="title"
                      placeholder="在此输入帖子标题"
                      className="post-select-post-title"
                      value={state.postListSelectCondition.title}
                      variant="outlined"
                    />
                    <IconButton aria-label="search" type="submit">
                      <SearchIcon/>
                    </IconButton>
                  </ValidatorForm>
                </section>
                {state.loadingStatus ? (
                  <div className="post-loading-container">
                    {state.loadingArr.map((n, index) => (
                      <div className="loading-item-container" key={index}>
                        <div>
                          <Skeleton width={55} height={29}/>
                        </div>
                        <div>
                          <Skeleton width="25%" height={29}/>
                          <Skeleton/>
                          <Skeleton width="15%"/>
                          <Skeleton variant="rect" height={155}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {/* 帖子搜索列表 */}
                    <section className="post-list">
                      {props.postList.records.length > 0 ? props.postList.records.map((postListItem, index) => {
                        try {
                          postListItem.preview = JSON.parse(postListItem.preview);
                        } catch (e) {
                        }
                        return (
                          <PostCategoryPostListItem key={index} postDescription={postListItem} hideCategoryName={true}/>
                        );
                      }) : (
                        <section className="not-data-container">暂时没有更多文章!</section>
                      )}
                    </section>
                    <TablePagination
                      labelRowsPerPage="每页显示条数"
                      rowsPerPageOptions={[10, 15, 20]}
                      component="div"
                      count={props.postListSelectCondition.count}
                      rowsPerPage={props.postListSelectCondition.pageSize}
                      page={props.postListSelectCondition.page - 1}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangePageSize}
                    />
                  </div>
                )}
              </Container>
            </section>
            {/* 创建文章模态框 */}
            <Dialog
              open={state.visibleInsertPostModel}
              fullWidth={true}
              maxWidth="md"
              TransitionComponent={Slide}
              onClose={() => this.handleToggleUploadModel(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              scroll="body"
            >
              <DialogTitle>上传图片</DialogTitle>
              <DialogContent className="insert-post-dialog-content">
                <section className="insert-post-container">
                  <ValidatorForm
                    onSubmit={this.handleInsertPostFormDataSubmit}
                  >
                    <TextValidator
                      fullWidth
                      margin="dense"
                      label="帖子标题"
                      onChange={this.handleInsertPostFormDataChange}
                      name="title"
                      placeholder="在此输入帖子标题"
                      className="post-insert-title"
                      validators={['required', 'minStringLength:1', 'maxStringLength:60']}
                      errorMessages={['请输入标题', '标题由1~60个字符组成', '标题由1~60个字符组成']}
                      value={state.insertPostFormData.title}
                      variant="outlined"
                    />
                    <SelectValidator
                      fullWidth
                      margin="dense"
                      label="帖子分区"
                      onChange={this.handleInsertPostFormDataChange}
                      name="postCategoryId"
                      placeholder="请选择文章所属分区"
                      className="post-insert-category-id"
                      validators={['required']}
                      errorMessages={['请选择文章所属分区']}
                      value={state.insertPostFormData.postCategoryId === 0 ? '' : state.insertPostFormData.postCategoryId}
                      variant="outlined"
                    >
                      {props.allPostCategoryList.filter(item => item.id !== 0).map((item, index) => (
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                      ))}
                    </SelectValidator>
                    <Tinymce
                      ref="tinymce"
                      initialValue={state.insertPostContent}
                      onEditorChange={(value) => {
                        this.setState({
                          insertPostContent: value
                        });
                      }}
                    />
                    <div className="submit-button-container">
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={state.insertPostFormSubmitted}
                      >发布帖子</Button>
                    </div>
                  </ValidatorForm>
                </section>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleCancel()} color="primary">
                  取消发帖
                </Button>
              </DialogActions>
            </Dialog>
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
      );
    };
  }
);
