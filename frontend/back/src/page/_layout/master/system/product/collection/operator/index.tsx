import React from 'react';
import { compose } from 'redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { Form, Input, Button, Upload, Icon, message, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import NProgress from 'nprogress';
import TinyMce from '../../../../../../../component/tinymce';
import api from '../../../../../../../api';
import oss from '../../../../../../../util/oss';
import './index.less';

// 当前组件的类型声明
interface Props extends FormComponentProps, RouteConfigComponentProps {
}

interface State {
  // 按钮的加载
  submitButtonLoading: boolean;
  // 操作类型[添加, 修改]
  actionType: string;
  // 表单默认值[操作类型为修改异步获取]
  formInitialValue: any;
  // 收藏品预览图可上传的类型
  previewImageUploadFileType: string;
  // 收藏品预览图上传 loading
  previewImageUploadLoading: boolean;
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class LayoutMasterSystemProductCollectionOperator extends React.Component<Props, State> {
    state: State = {
      submitButtonLoading: false,
      actionType: '',
      formInitialValue: {
        // 只有修改操作才有的 id
        id: '',
        // 收藏品名称
        name: '',
        // 收藏品预览图地址
        previewImageUrl: '',
        // 收藏品描述信息
        description: ''
      },
      previewImageUploadFileType: 'image/jpg,image/jpeg,image/png,image/bmp',
      previewImageUploadLoading: false
    };

    componentDidMount = (): void => {
      this.initPage();
    };

    /**
     * 初始化页面数据
     *
     */
    initPage = async () => {
      const { props } = this;
      const id = (props.match.params as any).id;
      if (id) {
        // 修改操作
        // 获取当前数据
        NProgress.start();
        const result: any = await api.collection.selectCollectionById(id);
        NProgress.done();
        this.setState({
          actionType: 'update',
          formInitialValue: result.data
        });
      } else {
        // 新增操作
        this.setState({
          actionType: 'insert'
        });
      }
    };

    /**
     * 验证上传文件的类型和大小
     *
     */
    uploadFileCheck = (file: any): boolean => {
      const { state } = this;
      const previewImageUploadFileTypeList = state.previewImageUploadFileType.split(',');
      if (previewImageUploadFileTypeList.indexOf(file.type) < 0) {
        message.error('文件类型必须为 ' + previewImageUploadFileTypeList + ' 格式!');
        return false;
      }
      if (file.size / 1024 / 1024 > 2) {
        message.error('文件大小不能超过 2MB!');
        return false;
      }
      return true;
    };

    /**
     * 预览图上传文件发送改变
     *
     */
    previewImageUploadFileChange = async (changeInfo: any) => {
      const { state } = this;
      const { file } = changeInfo;

      // loading 状态
      this.setState({
        previewImageUploadLoading: true
      });

      if (this.uploadFileCheck(file)) {
        // 获取 sts oss token
        const stsToken = await oss.selectOssStsToken();

        // 实例化 oss SDK
        const client = new (window as any).OSS({
          region: stsToken.region,
          bucket: stsToken.bucket,
          accessKeyId: stsToken.accessKeyId,
          accessKeySecret: stsToken.accessKeySecret,
          stsToken: stsToken.securityToken,
        });

        // 将 file 对象, 上传到 oss
        const result = await client.put('collection/preview-image/' + file.uid, file);

        // 更新收藏品预览图
        const formInitialValue = state.formInitialValue;
        formInitialValue.previewImageUrl = result.url;
        this.setState({
          formInitialValue
        });
      }

      // loading 状态
      this.setState({
        previewImageUploadLoading: false
      });
    };

    /**
     * 富文本的描述信息发生改变
     *
     */
    handlerDescriptionChange = (value: string): void => {
      const { state } = this;
      // 更新收藏品描述信息
      const formInitialValue = state.formInitialValue;
      formInitialValue.description = value;
      this.setState({
        formInitialValue
      });
    };

    /**
     * 处理表单提交
     *
     */
    handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      const { state, props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          if (state.previewImageUploadLoading) {
            notification.open({
              message: '请等待图片上传完成',
              duration: 2,
              placement: 'bottomLeft'
            });
            return;
          }

          // 开始加载状态
          NProgress.start();
          this.setState({
            submitButtonLoading: true
          });

          // 封装请求数据
          const requestData = {
            name: valueList.name,
            previewImageUrl: state.formInitialValue.previewImageUrl,
            description: state.formInitialValue.description
          };
          console.log(requestData);

          // 保存数据
          if (state.actionType === 'update') {
            // 修改操作
            await api.collection.updateCollectionById(state.formInitialValue.id, requestData);
          } else {
            // 添加操作
            await api.collection.insertCollection(requestData);
          }

          // 取消加载状态
          NProgress.done();
          this.setState({
            submitButtonLoading: false
          });

          // 跳转到列表页
          props.history.push('/system/product/collection/list');
        }
      });
    };

    render = (): JSX.Element => {
      const { state, props } = this;

      const baseFormItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 10 }
        }
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 12, offset: 7 },
          md: { span: 10, offset: 7 }
        }
      };

      return (
        <section className="collection-operation-container">
          <section className="operation-container">
            <Form onSubmit={this.handleSubmit}>
              {/* 收藏品名称 */}
              <Form.Item {...baseFormItemLayout} label="收藏品名称">
                {props.form.getFieldDecorator('name', {
                  initialValue: state.formInitialValue.name,
                  rules: [
                    { required: true, message: '请输入收藏品名称' },
                    { min: 2, max: 20, message: '收藏品名称由2~20个字符组成！' }
                  ]
                })(
                  <Input type="text" placeholder="请输入收藏品名称"/>
                )}
              </Form.Item>

              {/* 收藏品预览图 */}
              <Form.Item {...baseFormItemLayout} label="收藏品预览图" className="update-form-item">
                {props.form.getFieldDecorator('previewImageUrl', {
                  initialValue: state.formInitialValue.previewImageUrl,
                  rules: [
                    { required: true, message: '请上传收藏品预览图' }
                  ]
                })(
                  <Upload
                    accept={state.previewImageUploadFileType}
                    className="avatar-uploader"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={this.previewImageUploadFileChange}
                  >
                    {state.formInitialValue.previewImageUrl
                      ? (
                        <div className="upload-exist">
                          <Icon type={this.state.previewImageUploadLoading ? 'loading' : 'edit'}/>
                          <img src={state.formInitialValue.previewImageUrl} alt="收藏品预览图"/>
                        </div>
                      )
                      : (
                        <div>
                          <Icon type={this.state.previewImageUploadLoading ? 'loading' : 'plus'}/>
                          <div className="ant-upload-text">选择图片</div>
                        </div>
                      )}
                  </Upload>
                )}
              </Form.Item>

              {/* 收藏品描述信息 */}
              {
                state.actionType !== ''
                  ? (
                    <Form.Item {...baseFormItemLayout} label="收藏品描述信息" className="description-form-item">
                      {props.form.getFieldDecorator('description', {})(
                        <TinyMce
                          initialValue={state.formInitialValue.description || ''}
                          onEditorChange={value => this.handlerDescriptionChange(value)}
                        />
                      )}
                    </Form.Item>
                  )
                  : ''
              }

              {/* 提交 */}
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.submitButtonLoading}
                >保存</Button>
              </Form.Item>
            </Form>
          </section>
        </section>
      );
    };
  }
);
