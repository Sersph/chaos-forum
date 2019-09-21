import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import NProgress from 'nprogress';
import { AppState } from '../../../../../store';
import { updateUserInfo } from '../../../../../store/account';
// import api from '../../../../../api';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
  userInfo: object;
}

interface ConnectDispatch {
  updateUserInfo: (data: any) => object;
}

interface Props extends ConnectState, ConnectDispatch, RouteConfigComponentProps, FormComponentProps {
}

interface State {
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create(),
  connect<ConnectState, ConnectDispatch, Props>(
    (state: any | AppState) => ({
      userInfo: state.account.userInfo
    }),
    {
      updateUserInfo
    }
  )
)(
  class LayoutMasterAccountSignIn extends React.Component<Props, State> {
    componentDidMount = (): void => {
      // 鼠标移动效果
      new (window as any).Parallax(document.querySelector('.parallax-container'));
    };

    /**
     * 处理登陆逻辑
     *
     * @param e
     */
    handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      const { props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          NProgress.start();
          // const result = await api.account.signIn(valueList);
          // 写死结果集
          const result: any = { "code": "0", "data": { "id": 1, "username": "admin", "password": "123456" } };
          if (parseInt(result.code) === 0) {
            // 保存用户信息
            props.updateUserInfo(result.data);
            // 跳转
            setTimeout(() => {
              NProgress.done();
              props.history.push('/system/home/welcome');
            }, 500);
          } else {
            NProgress.done();
            notification.open({
              message: result.message,
              duration: 2,
              placement: 'bottomLeft'
            });
          }
        }
      });
    };

    render = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="account-sign-in-container">
          {/* 视察容器 */}
          <section className="parallax-container">
            <section className="bg-container" data-depth="1">
              <img src={require('../../../../../assets/account-sign-in-bg.svg')} alt=""/>
            </section>
          </section>
          {/* 表单容器 */}
          <section className="sign-in-form-wrapper">
            <section className="sign-in-form-container">
              <section className="header-container">
                <span>新创文化艺术品管理后台</span>
              </section>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                  {props.form.getFieldDecorator('username', {
                    initialValue: 'admin',
                    rules: [
                      { required: true, message: '请输入用户名!' }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="user"/>}
                      placeholder="用户名"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {props.form.getFieldDecorator('password', {
                    initialValue: '123456',
                    rules: [
                      { required: true, message: '请输入密码!' }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="lock"/>}
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block={true}
                  htmlType="submit"
                >
                  登陆
                </Button>
              </Form>
            </section>
          </section>
        </section>
      );
    };
  }
);
