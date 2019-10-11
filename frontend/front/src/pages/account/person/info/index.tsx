import React from 'react';
import LayoutAccountPerson from '../../../../component/_layout/account/person';
import './index.less';
import Head from 'next/head';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { AppState } from '../../../../type/state';
import { updateUserInfo } from '../../../../store/account';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import NProgress from 'nprogress';
import Dropzone from 'react-dropzone';
import api from '../../../../api';
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
    password: string;
  };
  personUserInfoFormSubmitted: boolean;
  // 通知
  snackbarMessage: string;
  snackbarStatus: boolean;
  // avatar
  avatar: any;
  dropZoneNoCLick: boolean;
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
    private editor: any;

    public constructor(props: Props) {
      super(props);
      this.state = {
        personUserInfoFormData: {
          password: ''
        },
        personUserInfoFormSubmitted: false,
        snackbarMessage: '',
        snackbarStatus: false,
        avatar: null,
        dropZoneNoCLick: false
      };
    }

    public componentDidMount = (): void => {
      // 添加自定义校验规则
      ValidatorForm.addValidationRule('checkUpdatePassword', (value) => {
        if (value === '') {
          return true;
        } else {
          return value.length >= 6 && value.length <= 25;
        }
      });
    };

    // 表单数据改变
    public handlePersonUserInfoFormDataChange = (event): void => {
      const { state } = this;
      this.setState({
        personUserInfoFormData: {
          ...state.personUserInfoFormData,
          [event.target.name]: event.target.value
        }
      });
    };

    // 将base64转换为文件
    public dataURLtoFile = (dataurl, filename) => {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
    };

    // 表单提交
    public handlePersonUserInfoFormDataSubmit = async () => {
      const { props, state } = this;

      NProgress.start();

      this.setState({
        personUserInfoFormSubmitted: true
      });

      const userInfo: any = {};
      if (state.personUserInfoFormData.password !== '') {
        userInfo.password = state.personUserInfoFormData.password;
      }

      if (this.state.avatar !== null) {
        var file = this.dataURLtoFile(this.editor.getImage().toDataURL('image/png'), 'default.jpg');
        // 这里把一个文件用base64编码
        const formData = new FormData();
        formData.append('file', file);
        const result: any = await api.post.fileUpload(formData);
        userInfo.buddha = result.data[0];
      }

      const result1: any = await api.account.updateUserInfo(userInfo);

      setTimeout(() => {
        if (result1.code === 0) {
          setTimeout(async () => {
            // 刷新用户状态
            const result2: any = await api.account.selectUserInfo();

            props.updateUserInfo({
              ...props.userInfo,
              ...result2.data
            });

            this.setState({
              personUserInfoFormSubmitted: false,
              snackbarMessage: '修改成功',
              snackbarStatus: true
            });

            NProgress.done();
          }, 200);
        } else {
          setTimeout(async () => {
            this.setState({
              personUserInfoFormSubmitted: false,
              snackbarMessage: '修改成功',
              snackbarStatus: true
            });

            NProgress.done();
          }, 200);
        }
      }, 500);

    };

    // 头像上传
    public handleDrop = (dropped): void => {
      this.setState({
        avatar: dropped[0]
      });
    };

    // 设置修改图片
    public setEditorRef = (editor) => this.editor = editor;

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
                onSubmit={this.handlePersonUserInfoFormDataSubmit}
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
                  onChange={this.handlePersonUserInfoFormDataChange}
                  name="password"
                  type="password"
                  value={state.personUserInfoFormData.password}
                  variant="outlined"
                  validators={['checkUpdatePassword']}
                  errorMessages={['密码由6~25个字符组成', '密码由6~25个字符组成']}
                />
                {/*
                    // @ts-ignore */}
                <Dropzone
                  onDrop={this.handleDrop}
                  noClick={state.dropZoneNoCLick}
                  style={{ width: '345px', height: '345px' }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <AvatarEditor
                        ref={this.setEditorRef}
                        width={345}
                        height={345}
                        borderRadius={200}
                        scale={1}
                        image={state.avatar || (props.userInfo.buddha !== '' ? props.userInfo.buddha : '/static/image/person-default-avatar.jpg')}
                        onMouseUp={() => setTimeout(() => {
                          this.setState({
                            dropZoneNoCLick: false
                          });
                        }, 233)}
                        onPositionChange={() => {
                          if (!state.dropZoneNoCLick) {
                            this.setState({
                              dropZoneNoCLick: true
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </Dropzone>
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
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={state.snackbarStatus}
            TransitionComponent={Slide}
            autoHideDuration={1000}
            message={<span>{state.snackbarMessage}</span>}
            onClose={() => {
              this.setState({
                snackbarStatus: false
              });
            }}
            action={[
              <IconButton
                key="1"
                color="inherit"
                onClick={() => {
                  this.setState({
                    snackbarStatus: false
                  });
                }}
              >
                <CloseIcon/>
              </IconButton>,
            ]}
          />
        </section>
      );
    };
  }
);
