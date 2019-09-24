import React from 'react';
import { compose } from 'redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { Form, Input, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import NProgress from 'nprogress';
import TinyMce from '../../../../../../../component/tinymce';
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
  // 文章分类列表
  articleCategoryList: any;
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
        // 文章标题
        title: '',
        // 文章分类id
        articleCategoryId: null,
        // 文章内容
        content: ''
      },
      articleCategoryList: []
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
        const result: any = await api.article.selectArticleById(id);
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
      // 获取所有文章分类

      this.setState({
        articleCategoryList: [
          {
            id: 1,
            name: '科技'
          },
          {
            id: 2,
            name: '汽车'
          }
        ]
      });
    };

    /**
     * 富文本的描述信息发生改变
     *
     */
    handlerContentChange = (value: string): void => {
      const { state } = this;
      // 更新收藏品描述信息
      const formInitialValue = state.formInitialValue;
      formInitialValue.content = value;
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

          // 开始加载状态
          NProgress.start();
          this.setState({
            submitButtonLoading: true
          });

          // 封装请求数据
          const requestData = {
            title: valueList.title,
            articleCategoryId: valueList.articleCategoryId,
            content: state.formInitialValue.content
          };
          console.log(requestData);

          // 保存数据
          if (state.actionType === 'insert') {
            // 添加操作
            await api.article.insertArticle(requestData);
          } else {
            // 修改操作
            await api.article.updateArticleById(state.formInitialValue.id, requestData);
          }

          // 取消加载状态
          NProgress.done();
          this.setState({
            submitButtonLoading: false
          });

          // 跳转到列表页
          props.history.push('/system/feature/article/list');
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
              {/* 文章标题 */}
              <Form.Item {...baseFormItemLayout} label="文章标题">
                {props.form.getFieldDecorator('title', {
                  initialValue: state.formInitialValue.title,
                  rules: [
                    { required: true, message: '请输入文章标题' },
                    { min: 2, max: 20, message: '文章标题由2~30个字符组成！' }
                  ]
                })(
                  <Input type="text" placeholder="请输入文章标题名称"/>
                )}
              </Form.Item>

              {/* 文章分类 */}
              <Form.Item {...baseFormItemLayout} label="文章分类">
                {props.form.getFieldDecorator('articleCategoryId', {
                  initialValue: state.formInitialValue.articleCategoryId,
                  rules: [
                    { required: true, message: '请选择文章所属分类' },
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="请选择文章所属分类"
                    optionFilterProp="children"
                    filterOption={(input: any, option: any): boolean => {
                      return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                  >
                    {state.articleCategoryList.map((articleCategory: any) => (
                      <Select.Option key={articleCategory.id}
                                     value={articleCategory.id}>{articleCategory.name}</Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              {/* 文章内容 */}
              <Form.Item {...baseFormItemLayout} label="文章内容" className="content-form-item">
                {props.form.getFieldDecorator('content', {})(
                  <TinyMce
                    initialValue={state.formInitialValue.content || ''}
                    onEditorChange={value => this.handlerContentChange(value)}
                  />
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
