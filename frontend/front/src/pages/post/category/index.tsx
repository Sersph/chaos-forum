import React from 'react';
import LayoutMaster from '../../../component/_layout/master';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import api from '../../../api';
import browser from '../../../util/browser';
import TablePagination from '@material-ui/core/TablePagination';
import Skeleton from '@material-ui/lab/Skeleton';
import NProgress from 'nprogress';
import { updatePostCategoryPagePostCategoryDetail } from '../../../store/post';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withRouter } from 'next/router';
import PostCategoryPostListItem from '../../../component/post/post-category-post-list-item';
import Tinymce from '../../../component/tinymce';
import htmlUtil from '../../../util/html';
import './index.less';

// 当前组件的类型声明
interface Props {
  // 帖子搜索条件
  postListSearchCondition: any;
  // 帖子数据, 服务端数据
  postList: any;
  // 帖子分类详情
  postCategoryDetail: any;
  // 路由信息
  router: any;
  // redux
  store: any;
}

interface State {
  // 加载
  loadingStatus: boolean;
  // 表单数据
  postFormData: {
    title: string;
  };
  // 文章内容
  postContent: string;
  postFormSubmitted: boolean;
}

// 当前组件类
export default withRouter(
  class Home extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        loadingStatus: false,
        postFormData: {
          title: ''
        },
        postContent: '',
        postFormSubmitted: false
      };
    }

    public static getInitialProps = async ({ query, store }) => {
      const postCategoryId = parseInt(query.id);
      console.log(postCategoryId);
      const currentPage = query.page ? parseInt(query.page) : 1;
      const currentPageSize = query.pageSize ? parseInt(query.pageSize) : 10;

      // 请求
      // 是否已经获取分类详情, 获取过则不获取
      let result1 = null;
      const postCategoryPagePostCategoryDetail = store.getState().post.postCategoryPagePostCategoryDetail;


      if (postCategoryPagePostCategoryDetail !== null && parseInt(postCategoryPagePostCategoryDetail.data.id) === postCategoryId) {
        result1 = postCategoryPagePostCategoryDetail;
      } else {
        result1 = api.post.selectPostCategoryDetail(postCategoryId);
      }

      // 获取分类帖子列表
      let result2: any = api.post.selectPostList({
        postCategoryId,
        page: currentPage,
        pageSize: currentPageSize
      });

      if (result1 instanceof Promise) {
        result1 = await result1;
        store.dispatch(updatePostCategoryPagePostCategoryDetail(result1));
      }
      result2 = await result2;

      // 处理响应
      let postCategoryDetail = {};
      if (result1.code === 0) {
        postCategoryDetail = result1.data;
      }

      let postList = {
        records: []
      };
      let postListSearchCondition = {
        categoryId: postCategoryId,
        count: 0,
        page: currentPage,
        pageSize: currentPageSize
      };
      if (result2.code === 0) {
        postList = {
          records: result2.data.records
        };
        postListSearchCondition = {
          ...postListSearchCondition,
          count: result2.data.count
        };
      }

      // 返回数据
      return {
        postCategoryDetail,
        postList,
        postListSearchCondition,
        loadingStatus: false,
        store
      };
    };

    public handlerRouterChangeStart = (event): void => {
      if (event.state.as.substring(0, 15) === '/post/category/') {
        this.setState({
          loadingStatus: true
        });
      }
    };

    public componentDidMount = (): void => {
      window.addEventListener('popstate', this.handlerRouterChangeStart);
    };

    public componentWillUnmount = (): void => {
      const { props } = this;
      window.removeEventListener('popstate', this.handlerRouterChangeStart);
      // 清空状态管理
      props.store && props.store.dispatch && props.store.dispatch(updatePostCategoryPagePostCategoryDetail(null));
    };

    public shouldComponentUpdate = (nextProps, nextState): boolean => {
      const { props } = this;
      setTimeout(() => {
        if (props.postList !== nextProps.postList) {
          this.setState({
            loadingStatus: false
          });
        }
      }, 150);
      return true;
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
        Router.push(
          `/post/category?id=${props.postListSearchCondition.categoryId}&page=${newPage + 1}&pageSize=${props.postListSearchCondition.pageSize}`,
          `/post/category/${props.postListSearchCondition.categoryId}?page=${newPage + 1}&pageSize=${props.postListSearchCondition.pageSize}`,
        );
      }, 100);
    };

    // 分页数据改变 - 每页多少条
    public handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { props } = this;

      NProgress.start();

      this.setState({
        loadingStatus: true
      });

      browser.scrollToTop(100);

      setTimeout(() => {
        Router.push(
          `/post/category?id=${props.postListSearchCondition.categoryId}&page=1&pageSize=${event.target.value}`,
          `/post/category/${props.postListSearchCondition.categoryId}?page=1&pageSize=${event.target.value}`,
        );
      }, 100);
    };

    // 表单数据改变
    public handlePostFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        postFormData: {
          ...state.postFormData,
          [event.target.name]: event.target.value
        }
      });
    };

    // 表单提交
    public handlePostFormDataSubmit = async () => {
      const { props, state } = this;
      this.setState({
        postFormSubmitted: true
      });

      NProgress.start();

      // 生成预览图
      const previewImageList = [];
      const nodeList = htmlUtil.parseHtmlStrToNodeList(state.postContent);
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i].tagName !== undefined && nodeList[i].tagName.toLowerCase() === 'p') {
          const pNodeList = nodeList[i].children;
          for (let j = 0; j < pNodeList.length; j++) {
            if (pNodeList[j].tagName.toLowerCase() === 'img') {
              previewImageList.push({
                path: pNodeList[j].src
              });
            }
          }
        }
      }

      const postData = {
        title: state.postFormData.title,
        content: state.postContent,
        previewImageList: JSON.stringify(previewImageList)
      };

      const result: any = await api.post.createPost(postData);

      if (result.code === 0) {
        setTimeout(() => {
          this.setState({
            loadingStatus: true
          });

          browser.scrollToTop(100);

          setTimeout(() => {
            // 清空文本框数据
            this.setState({
              postFormData: {
                title: ''
              },
              postContent: '',
              postFormSubmitted: false
            }, () => {
              setTimeout(() => {
                (this.refs['post-title'] as any).makeValid('');
                (this.refs['tinymce'] as any).handlerEditorChange('');
              }, 500);
            });

            Router.push(
              `/post/category?id=${props.postListSearchCondition.categoryId}`,
              `/post/category/${props.postListSearchCondition.categoryId}`,
            );
          }, 100);
        }, 1000);
      }
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="post-category-container">
          <Head>
            <title>{props.postCategoryDetail.categoryName}的帖子</title>
          </Head>
          <LayoutMaster>
            <section className="post-list-container">
              <Container maxWidth="sm" className="post-list-wrapper-container">
                <div className="header-action">
                  <Typography
                    variant="h5"
                    noWrap
                    className="hot"
                  >帖子分区- {props.postCategoryDetail.categoryName}
                  </Typography>
                  <Fab variant="extended" color="secondary">
                    <EditIcon/>我要发帖
                  </Fab>
                </div>
                {state.loadingStatus ? new Array(9).fill(null).map((n, index) => (
                  <div className="loading-item-container" key={index}>
                    <div>
                      <Skeleton variant="circle" width={65} height={65}/>
                    </div>
                    <div>
                      <Skeleton width="25%"/>
                      <Skeleton width="35%"/>
                      <Skeleton/>
                      <Skeleton width="15%"/>
                      <Skeleton variant="rect" height={155}/>
                    </div>
                  </div>
                )) : (
                  <div>
                    <section className="post-list">
                      {props.postList.records.map((postListItem, index) => (
                        <PostCategoryPostListItem key={index} postDescription={postListItem} hideCategoryName={true}/>
                      ))}
                    </section>
                    <TablePagination
                      labelRowsPerPage="每页显示条数"
                      rowsPerPageOptions={[10, 15, 20]}
                      component="div"
                      count={props.postListSearchCondition.count}
                      rowsPerPage={props.postListSearchCondition.pageSize}
                      page={props.postListSearchCondition.page - 1}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangePageSize}
                    />
                  </div>
                )}
                <section className="create-post-container">
                  <ValidatorForm
                    onSubmit={this.handlePostFormDataSubmit}
                  >
                    <TextValidator
                      ref="post-title"
                      fullWidth
                      label="帖子标题"
                      onChange={this.handlePostFormDataChange}
                      name="title"
                      type="title"
                      placeholder="在此输入帖子标题"
                      className="post-title"
                      validators={['required', 'minStringLength:1', 'maxStringLength:15']}
                      errorMessages={['请输入标题', '标题由1~15个字符组成']}
                      value={state.postFormData.title}
                      variant="outlined"
                    />
                    <Tinymce
                      ref="tinymce"
                      initialValue={state.postContent}
                      onEditorChange={(value) => {
                        this.setState({
                          postContent: value
                        });
                      }}
                    />
                    <div className="submit-button-container">
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={state.postFormSubmitted}
                      >发布帖子</Button>
                    </div>
                  </ValidatorForm>
                </section>
              </Container>
            </section>
          </LayoutMaster>
        </section>
      );
    };
  }
);
