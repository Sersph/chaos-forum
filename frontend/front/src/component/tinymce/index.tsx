import React from 'react';
// @ts-ignore
import { Editor } from '@tinymce/tinymce-react';
import TinymceUploadImage from './upload-image';
import './index.less';

// 当前组件的类型声明
interface Props {
  initialValue?: string;
  onEditorChange: (value: string) => void;
}

interface State {
  // 富文本的值
  value: string;
}

// 当前组件类
export default class Tinymce extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  public componentDidMount = (): void => {
    const { props } = this;
    this.setState({
      value: props.initialValue
    });
  };

  /**
   * 文件上传成功回调
   *
   */
  public appendValue = (imgHTML: string): void => {
    // 用 tinymce 自带的方法添加内容，会从光标处添加
    (window as any).tinymce.activeEditor.execCommand('mceInsertContent', false, imgHTML);
  };

  /**
   * 富文本的值发送改变
   *
   */
  public handlerEditorChange = (value: string): void => {
    const { props } = this;
    // 更新富文本的状态
    this.setState({
      value
    });
    // 告诉父组件值发送改变
    props.onEditorChange(value);
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="tinymce-container">

        <Editor
          id="t1"
          value={state.value}
          plugins={["paste"]}
          toolbar={['bold']}
          onEditorChange={(value: string) => this.handlerEditorChange(value)}
          init={{
            language: 'zh_CN',
            height: 500,
            fontsize_formats: "8px 10px 12px 14px 18px 24px 36px 48px 60px",
            paste_as_text: true,
            paste_preprocess: (pl, o) => {
            }
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
