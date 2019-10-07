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
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../type/state';
import { updateUserInfo } from '../../../store/account';
import api from '../../../api';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
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
            name: '首页',
            icon: <HomeIcon color="primary"/>,
            href: '/home'
          },
          {
            name: '全部分区',
            icon: <CategoryIcon color="primary"/>,
            href: '/post/category/all'
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

    /**
     * 监听用户状态 添加动画效果
     *
     * @param nextProps
     * @param nextState
     */
    public shouldComponentUpdate = (nextProps, nextState): boolean => {
      const { props } = this;
      if (props.userInfo.avatar !== nextProps.userInfo.avatar) {
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

    /**
     * 切换菜单栏显示
     * (手机端顶部三横按钮点击调用)
     *
     */
    public handleDrawerToggle = () => {
      this.setState({
        drawerMobileOpen: !this.state.drawerMobileOpen
      });
    };

    /**
     * 显示用户基本信息
     * 分为已登录和未登录
     *
     */
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

    /**
     * 退出登录清空状态
     *
     */
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

    /**
     * 顶部导航
     *
     */
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
                <img
                  src={(props.userInfo.avatar !== undefined && props.userInfo.avatar !== '') ? props.userInfo.avatar : '../../../static/image/person-default-avatar.jpg'}
                  alt="user-avatar"
                  className={`user-avatar ${state.showAvatarToggle ? 'active' : ''}`}
                />
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
                        src={props.userInfo.avatar !== undefined ? props.userInfo.avatar : '../../../static/image/person-default-avatar.jpg'}
                        alt="user-avatar"
                        className="avatar"
                      />
                      <Typography className="username">{props.userInfo.username}</Typography>
                    </div>
                    <div className="user-feature">
                      <Link href="/account/person/center">
                        <a href="/account/person/center">
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

    /**
     * 左侧菜单栏
     *
     */
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
      return (
        <div className="layout-master-container">
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
      );
    };
  }
);