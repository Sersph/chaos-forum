import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../type/state';
import { updateUserInfo } from '../../../../store/account';
import api from '../../../../api';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import NProgress from 'nprogress';
import Router from 'next/router';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
}

interface ConnectDispatch {
  updateUserInfo: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {
  router: any;
}

interface State {
  // 菜单页面
  menuList: any[];
  // 手机端菜单是否展开
  drawerMobileOpen: boolean;
  // 显示用户基本状态
  showAuthTooltip: boolean;
  showUserTooltip: boolean;
  // 用户头像动画
  showAvatarToggle: boolean;
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
    {
      updateUserInfo
    }
  ),
  withRouter
)(
  class LayoutMaster extends React.Component<Props, State> {
    public constructor(props) {
      super(props);
      this.state = {
        menuList: [
          {
            name: '我的资料',
            icon: <PersonIcon color="primary"/>,
            href: '/account/person/info'
          }
        ],
        drawerMobileOpen: false,
        showAuthTooltip: false,
        showUserTooltip: false,
        showAvatarToggle: false,
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    // 监听用户状态 添加动画效果
    public shouldComponentUpdate = (nextProps, nextState): boolean => {
      const { props } = this;
      if (props.userInfo.buddha !== nextProps.userInfo.buddha) {
        this.setState({
          showAvatarToggle: true
        });
        setTimeout(() => {
          this.setState({
            showAvatarToggle: false
          });
        }, 300);
      }
      return true;
    };

    // 监听用户是否登录
    public componentDidUpdate = (): void => {
      const { props } = this;
      if (props.userInfo.isGet) {
        if (props.userInfo.username === undefined) {
          setTimeout(() => {
            Router.push('/account/sign-in');
          }, 1500);
        }
      }
    };

    // 切换菜单栏显示
    // (手机端顶部三横按钮点击调用)
    public handleDrawerToggle = () => {
      this.setState({
        drawerMobileOpen: !this.state.drawerMobileOpen
      });
    };

    // 显示用户基本信息
    // 分为已登录和未登录
    public toggleUserInfoContainer = (flag: boolean): void => {
      const { props } = this;
      const isSignIn = props.userInfo.username !== undefined;
      if (flag) {
        if (isSignIn) {
          this.setState({
            showUserTooltip: true
          });
        } else {
          this.setState({
            showAuthTooltip: true
          });
        }
      } else {
        if (isSignIn) {
          this.setState({
            showUserTooltip: false
          });
        } else {
          this.setState({
            showAuthTooltip: false
          });
        }
      }
    };

    // 退出登录清空状态
    public signOut = async () => {
      const { props } = this;

      NProgress.start();

      await api.account.signOut();

      setTimeout(() => {
        this.setState({
          snackbarMessage: '退出成功 前往首页中...',
          snackbarStatus: true
        });

        this.setState({
          showUserTooltip: false
        });

        setTimeout(() => {
          // 刷新用户状态
          props.updateUserInfo({
            isGet: true
          });

          setTimeout(() => {
            // 跳转至首页
            Router.push({
              pathname: '/home'
            });
          }, 1000);
        }, 500);
      }, 500);
    };

    // 顶部导航
    public renderAppBarContainer = (): JSX.Element => {
      const { props, state } = this;
      return (
        <AppBar position="fixed" className="app-bar-container">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className="menu-button"
            >
              <MenuIcon/>
            </IconButton>
            <div className="title">
              <Link href="/home">
                <a href="/home">
                  <Typography variant="h6" noWrap>
                    混沌论坛
                  </Typography>
                </a>
              </Link>
            </div>
            {props.userInfo.isGet && (
              <section
                className="user-base-info-container"
                onMouseEnter={() => this.toggleUserInfoContainer(true)}
                onClick={() => this.toggleUserInfoContainer(true)}
                onMouseLeave={() => this.toggleUserInfoContainer(false)}
              >
                {props.userInfo.username !== undefined && props.userInfo.username !== '' ? (
                  <img
                    src={(props.userInfo.buddha !== undefined && props.userInfo.buddha !== '') ? props.userInfo.buddha : '../../../static/image/person-default-avatar.jpg'}
                    alt="user-avatar"
                    className={`user-avatar ${state.showAvatarToggle ? 'active' : ''}`}
                  />
                ) : (
                  <img
                    src={(props.userInfo.buddha !== undefined && props.userInfo.buddha !== '') ? props.userInfo.buddha : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRDVCMDQ2RkE3RDQ5MTRBNUI4NERBMDRGQzU5OUQ0ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjQ5MzlBRkU2RTBBMTFFNDk1MjQ4QTczNkVGQjY1Q0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjQ5MzlBRkQ2RTBBMTFFNDk1MjQ4QTczNkVGQjY1Q0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFGNTc0QkI0MTIyMDY4MTE4MjJBQzcyMzI1QTdBM0FGIiBzdFJlZjpkb2N1bWVudElEPSJENUIwNDZGQTdENDkxNEE1Qjg0REEwNEZDNTk5RDQ4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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'}
                    alt="user-avatar"
                    className={`user-avatar ${state.showAvatarToggle ? 'active' : ''}`}
                  />
                )}
                <section className="user-base-info">
                  <section className={`auth-tooltip ${state.showAuthTooltip ? 'active' : ''}`}>
                    <div className="line"/>
                    <div className="sign-in-tooltip">
                      <Typography className="text-tooltip">登录之后可以</Typography>
                      <div className="make-tooltip">
                        <div className="make-item write-post">
                          <i className="img"/>
                          <Typography align="center" className="item-text">写帖子</Typography>
                        </div>
                        <div className="make-item favorite-post">
                          <i className="img"/>
                          <Typography align="center" className="item-text">点赞帖子</Typography>
                        </div>
                      </div>
                      <div className="to-auth">
                        <Link href="/account/sign-in">
                          <a href="/account/sign-in">
                            <Button variant="contained" color="primary">
                              登录
                            </Button>
                          </a>
                        </Link>
                        <Link href="/account/sign-up">
                          <a href="/account/sign-up">
                            <Button variant="outlined" color="primary">
                              注册
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </section>
                  <section className={`user-tooltip ${state.showUserTooltip ? 'active' : ''}`}>
                    <div className="line"/>
                    <div className="sign-out" onClick={this.signOut}>
                      <i/><Typography className="sign-out-text">退出</Typography>
                    </div>
                    <div className="user-avatar-and-username">
                      <img
                        src={(props.userInfo.buddha !== undefined && props.userInfo.buddha !== '') ? props.userInfo.buddha : '../../../static/image/person-default-avatar.jpg'}
                        alt="user-avatar"
                        className="avatar"
                      />
                      <Typography className="username">{props.userInfo.username}</Typography>
                    </div>
                    <div className="user-feature">
                      <Link href="/account/person/info">
                        <a href="/account/person/info">
                          <div className="feature-item">
                            <i className="img"/>
                            <Typography className="item-text">个人中心</Typography>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </section>
                </section>
              </section>
            )}
          </Toolbar>
        </AppBar>
      );
    };

    // 左侧菜单栏
    public renderSidebarContainer = (): JSX.Element => {
      const { props, state } = this;

      const drawer = (
        <section>
          <div className="menu-header-display"/>
          <List>
            {state.menuList.map((menu) => (
              <div key={menu.name}>
                <Link href={menu.href}>
                  <a href={menu.href} className="menu-link">
                    <ListItem button className={props.router.pathname === menu.href ? 'menu-active' : ''}>
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText primary={menu.name}/>
                    </ListItem>
                  </a>
                </Link>
                <Divider/>
              </div>
            ))}
          </List>
        </section>
      );

      return (
        <nav className="sidebar-container" aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={'left'}
              open={state.drawerMobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: 'menu-wrapper'
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: 'menu-wrapper'
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      );
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return props.userInfo.isGet ?
        props.userInfo.username !== undefined ? (
          <div className="layout-account-person-container">
            {this.renderAppBarContainer()}
            {this.renderSidebarContainer()}
            <main className="content-container">
              {props.children}
            </main>
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
          </div>
        ) : (
          <div className="sign-in-tooltip-container">请登录后在访问此页面...</div>
        )
        : (
          <div className="loading-container">
            <CircularProgress/>
          </div>
        );
    };
  }
);
