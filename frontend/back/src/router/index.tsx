import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '../component/loading';
import ErrorNotFound from '../component/error/not-found';
import LayoutMaster from '../page/_layout/master';

// 非懒加载模块
// 用户
import LayoutMasterAccount from '../page/_layout/master/account';

// 用户登陆
import LayoutMasterAccountSignIn from '../page/_layout/master/account/sign-in';

// 系统
import LayoutMasterSystem from '../page/_layout/master/system';

// 工作台
import LayoutMasterSystemHomeWelcome from '../page/_layout/master/system/home/welcome';

// 个人用户
import LayoutMasterSystemAccountPersonUser from '../page/_layout/master/system/account/person-user';
import LayoutMasterSystemAccountPersonUserList from '../page/_layout/master/system/account/person-user/list';

// 帖子分类
import LayoutMasterSystemFeaturePostCategory from '../page/_layout/master/system/feature/post-category';
import LayoutMasterSystemFeaturePostCategoryList from '../page/_layout/master/system/feature/post-category/list';
import LayoutMasterSystemFeaturePostCategoryOperator
  from '../page/_layout/master/system/feature/post-category/operator';

// 帖子
import LayoutMasterSystemFeaturePost from '../page/_layout/master/system/feature/post';
import LayoutMasterSystemFeaturePostList from '../page/_layout/master/system/feature/post/list';


// 懒加载模块
// 仪表盘
const LayoutMasterSystemHome = Loadable({
  loader: () => import('../page/_layout/master/system/home'),
  loading: () => <Loading/>
});


// 账户
const LayoutMasterSystemAccount = Loadable({
  loader: () => import('../page/_layout/master/system/account'),
  loading: () => <Loading/>
});

// 功能
const LayoutMasterSystemFeature = Loadable({
  loader: () => import('../page/_layout/master/system/feature'),
  loading: () => <Loading/>
});


// 当前组件的类型声明
export interface MyRouteConfig extends RouteConfig {
  // 面包屑提示文字
  breadcrumb?: string;
  // 约束子路由
  routes?: MyRouteConfig[];
}

interface Props {
}

interface State {
  routeList: MyRouteConfig[];
}

// 当前组件类
export default class Router extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      routeList: [
        {
          // 根模块
          path: '/',
          component: LayoutMaster,
          routes: [
            // 用户登陆模块
            {
              path: '/account',
              component: LayoutMasterAccount,
              routes: [
                {
                  path: '/account/signIn',
                  component: LayoutMasterAccountSignIn
                }
              ]
            },
            {
              // 系统模块
              path: '/system',
              component: LayoutMasterSystem,
              routes: [
                // 仪表盘模块
                {
                  path: '/system/home',
                  component: LayoutMasterSystemHome,
                  breadcrumb: '仪表盘',
                  routes: [
                    {
                      path: '/system/home/welcome',
                      component: LayoutMasterSystemHomeWelcome,
                      breadcrumb: '工作台'
                    },
                    {
                      path: '',
                      component: ErrorNotFound
                    }
                  ]
                },
                // 用户模块
                {
                  path: '/system/account',
                  component: LayoutMasterSystemAccount,
                  breadcrumb: '账户管理',
                  routes: [
                    {
                      path: '/system/account/person-user',
                      component: LayoutMasterSystemAccountPersonUser,
                      breadcrumb: '个人用户',
                      routes: [
                        {
                          path: '/system/account/person-user',
                          component: LayoutMasterSystemAccountPersonUserList,
                          breadcrumb: '列表'
                        }
                      ]
                    }
                  ]
                },
                // 功能模块
                {
                  path: '/system/feature',
                  component: LayoutMasterSystemFeature,
                  breadcrumb: '内容管理',
                  routes: [
                    {
                      path: '/system/feature/postCategory',
                      component: LayoutMasterSystemFeaturePostCategory,
                      breadcrumb: '帖子分类',
                      routes: [
                        {
                          path: '/system/feature/postCategory/list',
                          component: LayoutMasterSystemFeaturePostCategoryList,
                          breadcrumb: '列表'
                        },
                        {
                          path: '/system/feature/postCategory/operator/:id',
                          component: LayoutMasterSystemFeaturePostCategoryOperator,
                          breadcrumb: '编辑'
                        },
                        {
                          path: '/system/feature/postCategory/operator',
                          component: LayoutMasterSystemFeaturePostCategoryOperator,
                          breadcrumb: '添加'
                        }
                      ]
                    },
                    {
                      path: '/system/feature/post',
                      component: LayoutMasterSystemFeaturePost,
                      breadcrumb: '帖子',
                      routes: [
                        {
                          path: '/system/feature/post/list',
                          component: LayoutMasterSystemFeaturePostList,
                          breadcrumb: '列表'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: '',
              component: () => <Redirect to='/system/home/welcome'/>
            }
          ]
        }
      ]
    };
  }


  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <BrowserRouter>
        {/* 分发所有路由组件的入口 */}
        {renderRoutes(state.routeList)}
      </BrowserRouter>
    );
  };
}
