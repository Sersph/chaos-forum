import React from 'react';
import './index.less';

// 当前组件的类型声明
interface ConnectState {
}

interface ConnectDispatch {
}

interface Props extends ConnectState, ConnectDispatch {
}

interface State {
}

// 当前组件类
export default class LayoutFooter extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="layout-footer-container">
        footer
      </section>
    );
  };
}
