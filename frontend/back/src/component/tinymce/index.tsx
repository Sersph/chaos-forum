import React from 'react';
// @ts-ignore
import { Editor } from '@tinymce/tinymce-react';
import TinymceUploadImage from './upload-image';
import config from '../../config';
import './index.less';

// 当前组件的类型声明
interface Props {
  initialValue: string
  onEditorChange: (value: string) => void
}

interface State {
  // 富文本的值
  value: string
}

// 当前组件类
export default class Tinymce extends React.Component<Props, State> {
  state: State = {
    value: ''
  };

  componentDidMount = (): void => {
    const { props } = this;
    this.setState({
      value: props.initialValue
    });
  };

  /**
   * 文件上传成功回调
   *
   */
  appendValue = (imgHTML: string): void => {
    const { state } = this;
    // 拼接 img 标签到富文本值得后方
    this.setState({
      value: state.value + imgHTML
    });
  };

  /**
   * 富文本的值发送改变
   *
   */
  handlerEditorChange = (value: string): void => {
    const { props } = this;
    // 更新富文本的状态
    this.setState({
      value
    });
    // 告诉父组件值发送改变
    props.onEditorChange(value);
  };

  render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="tinymce-container">
        <Editor
          cloudChannel="dev"
          value={state.value}
          plugins={config.TINYMCE_PLUGINS}
          toolbar={config.TINYMCE_TOOLBAR}
          onEditorChange={(value: string) => this.handlerEditorChange(value)}
          init={{
            language: 'zh_CN',
            height: 500,
            fontsize_formats: "8px 10px 12px 14px 18px 24px 36px 48px 60px"
          }}
        />
        {/* 图片上传组件 */}
        <div className="editor-custom-btn-container">
          <TinymceUploadImage className="editor-upload-btn" appendValue={this.appendValue}/>
        </div>
      </section>
    );
  };
}
