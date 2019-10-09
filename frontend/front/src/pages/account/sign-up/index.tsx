import React from 'react';
import LayoutMaster from '../../../component/_layout/master';
import './index.less';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../type/state';
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
  signUpFormData: {
    username: string;
    password: string;
    confirmPassword: string;
  };
  signUpFormSubmitted: boolean;
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
  class AccountSignUp extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        signUpFormData: {
          username: '',
          password: '',
          confirmPassword: ''
        },
        signUpFormSubmitted: false,
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    public componentDidMount = (): void => {
      // 添加自定义校验规则
      ValidatorForm.addValidationRule('checkConfirmPassword', (value) => {
        const { state } = this;
        return value === state.signUpFormData.password;
      });
    };

    public componentWillUnmount = (): void => {
      ValidatorForm.removeValidationRule('checkConfirmPassword');
    };

    // 表单数据改变
    public handleSignUpFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        signUpFormData: {
          ...state.signUpFormData,
          [event.target.name]: event.target.value
        }
      });
      // 如果密码验证确认密码
      if (event.target.name === 'password' && state.signUpFormData.confirmPassword !== '') {
        (this.refs['sign-up-form'] as any).isFormValid(false);
      }
    };

    // 表单提交
    public handleSignUpFormDataSubmit = async () => {
      const { props, state } = this;
      this.setState({
        signUpFormSubmitted: true
      });

      NProgress.start();

      const result1: any = await api.account.signUp({
        username: state.signUpFormData.username,
        password: state.signUpFormData.password
      });

      setTimeout(() => {
        if (result1.code === 0) {
          this.setState({
            snackbarMessage: '注册成功 前往首页中...',
            snackbarStatus: true
          });

          setTimeout(async () => {
            // 强制登录用户
            api.account.signIn({
              username: state.signUpFormData.username,
              password: state.signUpFormData.password
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

            }, 200);

          }, 500);
        } else if (result1.code === 104) {
          this.setState({
            snackbarMessage: `${result1.message}`,
            snackbarStatus: true,
            signUpFormSubmitted: false
          });
          NProgress.done();
        } else {
          this.setState({
            snackbarMessage: `注册失败，请稍后重试 ${result1.code}: ${result1.message}`,
            snackbarStatus: true,
            signUpFormSubmitted: false
          });
          NProgress.done();
        }
      }, 500);
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="account-sign-up-container">
          <Head>
            <title>混沌论坛 - 用户注册</title>
          </Head>
          <LayoutMaster>
            <Container maxWidth="sm">
              <Typography className="sign-up-title" variant="h5" align="center" noWrap>
                混沌论坛 - 用户注册
              </Typography>
              <ValidatorForm
                ref="sign-up-form"
                onSubmit={this.handleSignUpFormDataSubmit}
              >
                <TextValidator
                  fullWidth
                  label="用户名"
                  onChange={this.handleSignUpFormDataChange}
                  name="username"
                  type="username"
                  validators={['required', 'minStringLength:3', 'maxStringLength:15']}
                  errorMessages={['请输入用户名', '用户名由3~15个字符组成']}
                  value={state.signUpFormData.username}
                  variant="outlined"
                />
                <TextValidator
                  fullWidth
                  label="密码"
                  onChange={this.handleSignUpFormDataChange}
                  name="password"
                  type="password"
                  validators={['required', 'minStringLength:6', 'maxStringLength:25']}
                  errorMessages={['请输入密码', '密码由6~25个字符组成', '密码由6~25个字符组成']}
                  value={state.signUpFormData.password}
                  variant="outlined"
                />
                <TextValidator
                  fullWidth
                  ref="confirm-password-form-item"
                  label="确认密码"
                  onChange={this.handleSignUpFormDataChange}
                  name="confirmPassword"
                  type="password"
                  validators={['checkConfirmPassword', 'required', 'minStringLength:6', 'maxStringLength:25']}
                  errorMessages={['两次输入密码不一致', '请再次确认密码', '密码由6~25个字符组成', '密码由6~25个字符组成']}
                  value={state.signUpFormData.confirmPassword}
                  variant="outlined"
                />
                <div className="button-form-item">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={state.signUpFormSubmitted}
                  >提交</Button>
                </div>
                <Link href="/account/sign-in">
                  <a href="/account/sign-in">
                    <Typography className="to-tooltip" align="right" noWrap>
                      已有账号, 直接登录
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
