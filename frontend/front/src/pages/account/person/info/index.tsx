import React from 'react';
import LayoutAccountPerson from '../../../../component/_layout/account/person';
import './index.less';
import Head from 'next/head';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../type/state';
import { updateUserInfo } from '../../../../store/account';
import Container from '@material-ui/core/Container';
import NProgress from 'nprogress';
import api from "../../../../api";
import Button from '@material-ui/core/Button';

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
  personUserInfoFormData: {
    username: string;
    password: string;
  };
  personUserInfoFormSubmitted: boolean;
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
        personUserInfoFormData: {
          username: props.userInfo.username,
          password: ''
        },
        personUserInfoFormSubmitted: false,
        snackbarMessage: '',
        snackbarStatus: false
      };
    }

    // 表单数据改变
    public handleSignInFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        personUserInfoFormData: {
          ...state.personUserInfoFormData,
          [event.target.name]: event.target.value
        }
      });
    };

    // 表单提交
    public handleSignInFormDataSubmit = async () => {
      const { props, state } = this;
      this.setState({
        personUserInfoFormSubmitted: true
      });

      NProgress.start();

      const result1: any = await api.account.signIn(state.personUserInfoFormData);

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

            NProgress.done();
          }, 500);
        } else if (result1.code === 101) {
          this.setState({
            snackbarMessage: `用户名或密码不正确`,
            snackbarStatus: true,
            personUserInfoFormSubmitted: false
          });
          NProgress.done();
        } else {
          this.setState({
            snackbarMessage: `${result1.code}: ${result1.message}`,
            snackbarStatus: true,
            personUserInfoFormSubmitted: false
          });
          NProgress.done();
        }
      }, 500);
    };

    public render = (): JSX.Element => {
      const { props, state } = this;
      return (
        <section className="account-person-info-container">
          <Head>
            <title>我的资料 - 个人中心 - 混沌论坛</title>
          </Head>
          <LayoutAccountPerson>
            <Container maxWidth="xs">
              <ValidatorForm
                onSubmit={this.handleSignInFormDataSubmit}
              >
                <TextValidator
                  fullWidth
                  label="用户名"
                  margin="dense"
                  disabled
                  name="username"
                  type="text"
                  defaultValue={props.userInfo.username}
                  variant="outlined"
                />
                <TextValidator
                  fullWidth
                  label="密码 - 留空不修改"
                  margin="dense"
                  onChange={this.handleSignInFormDataChange}
                  name="password"
                  type="password"
                  validators={['minStringLength:6', 'maxStringLength:25']}
                  errorMessages={['密码由6~25个字符组成', '密码由6~25个字符组成']}
                  value={state.personUserInfoFormData.password}
                  variant="outlined"
                />
                <div className="button-form-item">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={state.personUserInfoFormSubmitted}
                  >保存</Button>
                </div>
              </ValidatorForm>
            </ Container>
          </LayoutAccountPerson>
        </section>
      );
    };
  }
);
