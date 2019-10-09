import React from 'react';
import LayoutAccountPerson from '../../../../component/_layout/account/person';
import './index.less';
import Head from 'next/head';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../type/state';
import { updateUserInfo } from '../../../../store/account';

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
      this.state = {};
    }

    public render = (): JSX.Element => {
      return (
        <section className="account-person-info-container">
          <Head>
            <title>我的资料 - 个人中心 - 混沌论坛</title>
          </Head>
          <LayoutAccountPerson>
            123
          </LayoutAccountPerson>
        </section>
      );
    };
  }
);
