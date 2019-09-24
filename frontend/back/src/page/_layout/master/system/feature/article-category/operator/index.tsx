import React from 'react';
import { compose } from 'redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import NProgress from 'nprogress';
import api from '../../../../../../../api';
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
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class LayoutMasterSystemFeatureArticleOperator extends React.Component<Props, State> {
    state: State = {
      submitButtonLoading: false,
      actionType: '',
      formInitialValue: {
        // 只有修改操作才有的 id
        id: '',
        // 文章分类名称
        name: ''
      },
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
        const result: any = await api.articleCategory.selectArticleCategoryById(id);
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
     * 处理表单提交
     *
     */
    handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      const { state, props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {

          // 开始加载状态
          NProgress.start();
          this.setState({
            submitButtonLoading: true
          });

          // 封装请求数据
          const requestData = {
            name: valueList.name
          };
          console.log(requestData);

          // 保存数据
          if (state.actionType === 'insert') {
            // 添加操作
            await api.articleCategory.insertArticleCategory(requestData);
          } else {
            // 修改操作
            await api.articleCategory.updateArticleCategoryById(state.formInitialValue.id, requestData);
          }

          // 取消加载状态
          NProgress.done();
          this.setState({
            submitButtonLoading: false
          });

          // 跳转到列表页
          props.history.push('/system/feature/articleCategory/list');
        }
      });
    };

    render = (): JSX.Element => {
      const { state, props } = this;

      const baseFormItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 12, offset: 4 },
          md: { span: 10, offset: 4 }
        }
      };

      return (
        <section className="operation-wrapper">
          <section className="operation-container">
            <Form onSubmit={this.handleSubmit}>
              {/* 分类名称 */}
              <Form.Item {...baseFormItemLayout} label="分类名称">
                {props.form.getFieldDecorator('name', {
                  initialValue: state.formInitialValue.name,
                  rules: [
                    { required: true, message: '请输入文章分类名称' },
                    { min: 2, max: 64, message: '文章分类名称由2~64个字符组成！' }
                  ]
                })(
                  <Input type="text" placeholder="请输入文章分类名称"/>
                )}
              </Form.Item>

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
