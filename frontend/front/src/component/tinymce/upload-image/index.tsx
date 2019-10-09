import React from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NProgress from 'nprogress';
import oss from '../../../util/oss';
import './index.less';
import api from '../../../api';

// 当前组件的类型声明
interface Props {
  className?: string;
  appendValue: (value: string) => void;
}

interface State {
  // 控制模态款是否显示
  visibleUploadModel: boolean;
  // 上传的文件列表
  fileList: any;
  // 上传状态
  uploadSubmitted: boolean;
}

// 当前组件类
export default class TinymceUploadImage extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      visibleUploadModel: false,
      fileList: [],
      uploadSubmitted: false
    };
  }


  // 显示/隐藏上传文件模态框
  public handleToggleUploadModel = (flag: boolean): void => {
    this.setState({
      visibleUploadModel: flag
    });
  };

  // 上传文件发送改变
  public uploadFileChange = async (file: any) => {
    this.setState({
      fileList: file
    });
  };

  // 上传图片确认按钮
  public handleOk = async () => {
    const { props, state } = this;
    NProgress.start();

    this.setState({
      uploadSubmitted: true
    });

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

    const fileUploadResult = await state.fileList.map(async file => {
      const formData = new FormData();
      formData.append('file', file);
      const result: any = await api.post.fileUpload(formData);

      // 保存 oss 结果集到已上传的文件列表
      file.ossResult = {
        thumbnail: result.data[0],
        original: result.data[1]
      };

      // 将图片上传到服务器
      // file.ossResult = await client.put('collection/description-image/' + file.name, file);
      return file;
    });

    Promise.all(fileUploadResult).then((fileUploadResult) => {
      // 拼接已上传成功的 img 标签
      const imageHTML = fileUploadResult.map((item: any) => {
        return `<img src="${item.ossResult.original}" class="tinymce-upload-image" data-thumbnail="${item.ossResult.thumbnail}"/>`;
      });

      // 回调上传图片成功
      props.appendValue(imageHTML.join(''));

      // 隐藏上传模态框, 清空已上传文件
      this.setState({
        visibleUploadModel: false,
        fileList: [],
        uploadSubmitted: false
      });

      NProgress.done();
    });
  };

  // 上传图片取消按钮
  public handleCancel = (): void => {
    // 隐藏上传模态框, 清空已上传文件
    this.setState({
      visibleUploadModel: false,
      fileList: []
    });
  };

  public render = (): JSX.Element => {
    const { state } = this;
    return (
      <section className="tinymce-editor-image-container">
        <div className="mce-widget mce-btn mce-last" onClick={() => this.handleToggleUploadModel(true)}>
          <i className="mce-ico mce-i-image"></i>
        </div>
        {/* 上传文件模态框 */}
        <Dialog
          open={state.visibleUploadModel}
          fullWidth={true}
          maxWidth="md"
          TransitionComponent={Slide}
          onClose={() => this.handleToggleUploadModel(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>上传图片</DialogTitle>
          <DialogContent className="upload-img-dialog-content">
            {/*
              // @ts-ignore */}
            <DropzoneArea
              dropzoneClass="upload-drop-zone"
              dropzoneText="将目录或多个文件拖拽到此，或单击直接上传"
              onChange={this.uploadFileChange}
              acceptedFiles={['image/*']}
              filesLimit={5}
              maxFileSize={2097152}
              getFileAddedMessage={(fileName: string) => `文件已添加${fileName}`}
              getFileRemovedMessage={(fileName: string) => `文件已移除${fileName}`}
              getFileLimitExceedMessage={(filesLimit: string) => `文件一次性最大只能上传${filesLimit}张`}
              getDropRejectMessage={() => `请上传2m内的图片格式文件`}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              取消
            </Button>
            <Button disabled={state.uploadSubmitted} onClick={() => this.handleOk()} color="primary">
              立即上传
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    );
  };
}
