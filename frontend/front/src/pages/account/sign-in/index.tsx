import React from 'react';
import LayoutMaster from '../../../component/_layout/master';
import './index.less';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../type/state';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { updateUserInfo } from '../../../store/account';
import NProgress from 'nprogress';
import Router from 'next/router';
import api from '../../../api';

// 当前组件的类型声明
interface ConnectState {
  userInfo: any;
}

interface ConnectDispatch {
  updateUserInfo: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch {

}

interface State {
  // 表单数据
  signInFormData: {
    username: string;
    password: string;
  };
  signInFormSubmitted: boolean;
  // 通知
  snackbarMessage: string;
  snackbarStatus: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  connect<ConnectState, ConnectDispatch, Props>(
    (app: AppState) => ({
      userInfo: app.account.userInfo
    }),
    {
      updateUserInfo
    }
  )
)(
  class AccountSignIn extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        signInFormData: {
          username: '',
          password: ''
        },
        signInFormSubmitted: false,
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    // 表单数据改变
    public handleSignInFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        signInFormData: {
          ...state.signInFormData,
          [event.target.name]: event.target.value
        }
      });
    };

    // 表单提交
    public handleSignInFormDataSubmit = async () => {
      const { props, state } = this;
      this.setState({
        signInFormSubmitted: true
      });

      NProgress.start();

      const result1: any = await api.account.signIn(state.signInFormData);

      setTimeout(() => {
        if (result1.code === 0) {
          this.setState({
            snackbarMessage: '登录成功 前往首页中...',
            snackbarStatus: true
          });

          setTimeout(async () => {
            // 刷新用户状态
            const result2: any = await api.account.selectUserInfo();

            props.updateUserInfo({
              ...props.userInfo,
              ...result2.data
            });

            setTimeout(() => {
              // 跳转至首页
              Router.push({
                pathname: '/home'
              });
            }, 1000);
          }, 500);
        } else if (result1.code === 101) {
          this.setState({
            snackbarMessage: `用户名或密码不正确`,
            snackbarStatus: true,
            signInFormSubmitted: false
          });
          NProgress.done();
        } else {
          this.setState({
            snackbarMessage: `${result1.code}: ${result1.message}`,
            snackbarStatus: true,
            signInFormSubmitted: false
          });
          NProgress.done();
        }
      }, 500);
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="account-sign-in-container">
          <Head>
            <title>混沌论坛 - 用户登录</title>
          </Head>
          <LayoutMaster>
            <Container maxWidth="xs">
              <Typography className="sign-in-title" variant="h5" align="center" noWrap>
                混沌论坛 - 用户登录
              </Typography>
              <ValidatorForm
                onSubmit={this.handleSignInFormDataSubmit}
              >
                <TextValidator
                  fullWidth
                  margin="dense"
                  label="用户名"
                  onChange={this.handleSignInFormDataChange}
                  name="username"
                  type="text"
                  validators={['required', 'minStringLength:3', 'maxStringLength:15']}
                  errorMessages={['请输入用户名', '用户名由3~15个字符组成']}
                  value={state.signInFormData.username}
                  variant="outlined"
                />
                <TextValidator
                  fullWidth
                  margin="dense"
                  label="密码"
                  onChange={this.handleSignInFormDataChange}
                  name="password"
                  type="password"
                  validators={['required', 'minStringLength:6', 'maxStringLength:25']}
                  errorMessages={['请输入密码', '密码由6~25个字符组成', '密码由6~25个字符组成']}
                  value={state.signInFormData.password}
                  variant="outlined"
                />
                <div className="button-form-item">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={state.signInFormSubmitted}
                  >登录</Button>
                </div>
                <Link href="/account/sign-up">
                  <a href="/account/sign-up">
                    <Typography className="to-tooltip" align="right" noWrap>
                      首次使用? 点我去注册
                    </Typography>
                  </a>
                </Link>
              </ValidatorForm>
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
      );
    };
  }
);
