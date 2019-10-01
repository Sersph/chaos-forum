import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import Link from 'next/link';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { updateUserInfo } from '../../../store/account';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
  router: any;
}

interface State {
  // 菜单页面
  menuList: any[];
  // 手机端菜单是否展开
  drawerMobileOpen: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
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
            icon: <HomeIcon/>,
            href: '/home'
          },
          {
            name: '全部分区',
            icon: <CategoryIcon/>,
            href: '/post-category'
          }
        ],
        drawerMobileOpen: false
      };
    }

    // 切换菜单栏显示(手机端按钮点击调用)
    public handleDrawerToggle = () => {
      this.setState({
        drawerMobileOpen: !this.state.drawerMobileOpen
      });
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

    // 顶部导航
    public renderAppBarContainer = (): JSX.Element => {
      const { props } = this;
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
            <Typography variant="h6" noWrap>
              混沌论坛
              <span>{props.userInfo.username}</span>
            </Typography>
          </Toolbar>
        </AppBar>
      );
    };

    public render = (): JSX.Element => {
      const { props } = this;
      return (
        <div className="layout-master-container">
          {this.renderAppBarContainer()}
          {this.renderSidebarContainer()}
          <main className="content-container">
            {props.children}
          </main>
        </div>
      );
    };
  }
);
