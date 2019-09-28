import React from 'react';
import './_error.less';

// 当前组件类型声明
interface Props {
}

interface State {
}

export default class Error extends React.Component<Props, State> {
  public render = (): JSX.Element => {
    return (
      <section className="error-container">
        <h3>服务器正在开小差, 请稍后重试！</h3>
      </section>
    );
  };
}
