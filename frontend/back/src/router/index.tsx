import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '../component/loading';
import ErrorNotFound from '../component/error/not-found';
import LayoutMaster from '../page/_layout/master';

// 非懒加载模块
// 账户
import LayoutMasterAccount from '../page/_layout/master/account';

// 账户登陆
import LayoutMasterAccountSignIn from '../page/_layout/master/account/sign-in';

// 系统
import LayoutMasterSystem from '../page/_layout/master/system';

// 工作台
import LayoutMasterSystemHomeWelcome from '../page/_layout/master/system/home/welcome';

// 文章
import LayoutMasterSystemFeatureArticle from '../page/_layout/master/system/feature/article';
import LayoutMasterSystemFeatureArticleList from '../page/_layout/master/system/feature/article/list';
import LayoutMasterSystemFeatureArticleOperator from '../page/_layout/master/system/feature/article/operator';

// 文章分类
import LayoutMasterSystemFeatureArticleCategory from '../page/_layout/master/system/feature/article-category';
import LayoutMasterSystemFeatureArticleCategoryList from '../page/_layout/master/system/feature/article-category/list';
import LayoutMasterSystemFeatureArticleCategoryOperator
  from '../page/_layout/master/system/feature/article-category/operator';


// 懒加载模块
// 仪表盘
const LayoutMasterSystemHome = Loadable({
  loader: () => import('../page/_layout/master/system/home'),
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
  public state: State = {
    routeList: [
      {
        // 根模块
        path: '/',
        component: LayoutMaster,
        routes: [
          // 账户登陆模块
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
              // 功能模块
              {
                path: '/system/feature',
                component: LayoutMasterSystemFeature,
                breadcrumb: '内容管理',
                routes: [
                  {
                    path: '/system/feature/article',
                    component: LayoutMasterSystemFeatureArticle,
                    breadcrumb: '文章',
                    routes: [
                      {
                        path: '/system/feature/article/list',
                        component: LayoutMasterSystemFeatureArticleList,
                        breadcrumb: '列表'
                      },
                      {
                        path: '/system/feature/article/operator/:id',
                        component: LayoutMasterSystemFeatureArticleOperator,
                        breadcrumb: '修改'
                      },
                      {
                        path: '/system/feature/article/operator',
                        component: LayoutMasterSystemFeatureArticleOperator,
                        breadcrumb: '添加'
                      }
                    ]
                  },
                  {
                    path: '/system/feature/articleCategory',
                    component: LayoutMasterSystemFeatureArticleCategory,
                    breadcrumb: '文章分类',
                    routes: [
                      {
                        path: '/system/feature/articleCategory/list',
                        component: LayoutMasterSystemFeatureArticleCategoryList,
                        breadcrumb: '列表'
                      },
                      {
                        path: '/system/feature/articleCategory/operator/:id',
                        component: LayoutMasterSystemFeatureArticleCategoryOperator,
                        breadcrumb: '修改'
                      },
                      {
                        path: '/system/feature/articleCategory/operator',
                        component: LayoutMasterSystemFeatureArticleCategoryOperator,
                        breadcrumb: '添加'
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
