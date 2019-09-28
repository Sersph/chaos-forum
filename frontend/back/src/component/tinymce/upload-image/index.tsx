import React from 'react';
import { Button, Modal, Upload, Icon, message } from 'antd';
// import oss from '../../../util/oss';
import api from '../../../api';

// 当前组件的类型声明
interface Props {
  className?: string;
  appendValue: (value: string) => void;
}

interface State {
  // 控制模态款是否显示
  visibleUploadModel: boolean;
  // 图片可上传的类型
  imageUploadFileType: string;
  // 已上传成功的文件列表
  successUploadFileList: any;
}

// 当前组件类
export default class TinymceUploadImage extends React.Component<Props, State> {
  public state: State = {
    visibleUploadModel: false,
    imageUploadFileType: 'image/jpg,image/jpeg,image/png,image/bmp',
    successUploadFileList: []
  };

  /**
   * 显示上传文件模态框
   *
   */
  public visibleUploadModel = (): void => {
    this.setState({
      visibleUploadModel: true
    });
  };

  /**
   * 验证上传文件的类型和大小
   *
   */
  public uploadFileCheck = (file: any): boolean => {
    const { state } = this;
    const imageUploadFileTypeList = state.imageUploadFileType.split(',');
    if (imageUploadFileTypeList.indexOf(file.type) < 0) {
      message.error('文件类型必须为 ' + imageUploadFileTypeList + ' 格式!');
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error('文件大小不能超过 2MB!');
      return false;
    }
    return true;
  };

  /**
   * 上传文件发送改变
   *
   */
  public uploadFileChange = async (changeInfo: any) => {
    const { file } = changeInfo;
    if (!this.uploadFileCheck(file)) {
      return;
    }

    // 不是删除操作 上传图片
    if (file.status !== 'removed') {
      if (this.uploadFileCheck(file)) {
        // 获取 sts oss token
        // const stsToken = await oss.selectOssStsToken();

        // 实例化 oss SDK
        // const client = new (window as any).OSS({
        //   region: stsToken.region,
        //   bucket: stsToken.bucket,
        //   accessKeyId: stsToken.accessKeyId,
        //   accessKeySecret: stsToken.accessKeySecret,
        //   stsToken: stsToken.securityToken,
        // });

        // 将 file 对象, 上传到 oss
        // const result = await client.put('collection/description-image/' + file.uid, file);

        const formData = new FormData();
        formData.append('file', file);
        const result: any = await api.article.fileUpload(formData);

        // 保存 oss 结果集到已上传的文件列表
        changeInfo.fileList[changeInfo.fileList.length - 1].ossResult = {
          url: result.data.data
        };
      }
    }

    // 更新已上传的文件列表
    this.setState({
      successUploadFileList: changeInfo.fileList
    });
  };

  /**
   * 上传图片确认按钮
   *
   */
  public handleOk = (): void => {
    const { props, state } = this;
    // 拼接已上传成功的 img 标签
    const imageHTML = state.successUploadFileList.map((item: any) => {
      return `<img src="${item.ossResult.url}" class="tinymce-upload-image"/>`;
    });
    // 回调上传图片成功
    props.appendValue(imageHTML.join(''));
    // 隐藏上传模态框, 清空已上传文件
    this.setState({
      visibleUploadModel: false,
      successUploadFileList: []
    });
  };

  /**
   * 上传图片取消按钮
   *
   */
  public handleCancel = (): void => {
    // 隐藏上传模态框, 清空已上传文件
    this.setState({
      visibleUploadModel: false,
      successUploadFileList: []
    });
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="tinymce-editor-image-container">
        <Button
          className="editor-upload-btn"
          type="primary"
          onClick={() => this.visibleUploadModel()}
        >上传图片</Button>
        {/* 上传文件模态框 */}
        <Modal
          title="上传图片"
          okText="保存"
          cancelText="取消"
          visible={state.visibleUploadModel}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <Upload
            accept={state.imageUploadFileType}
            listType="picture-card"
            fileList={state.successUploadFileList}
            showUploadList={{
              showPreviewIcon: false
            }}
            beforeUpload={() => false}
            onChange={this.uploadFileChange}
          >
            <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">选择图片</div>
            </div>
          </Upload>
        </Modal>
      </section>
    );
  };
}
