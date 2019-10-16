import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Divider, Table, Modal, Button, Col, Form, Row, Input, Tag } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import api from '../../../../../../../api';

// 当前组件的类型声明
interface Props extends FormComponentProps {
}

interface State {
  // 表格的适配信息
  columns: any;
  // 表格的数据
  dataSource: any;
  // 表格的分页
  pagination: any;
  // 获取表格数据的条件
  searchCondition: any;
  // 表格加载状态
  loading: boolean;
  // 表格搜索的排序
  searchOrder: any;
}

// 当前组件类
export default compose<React.ComponentClass>(
  Form.create()
)(
  class LayoutMasterSystemFeaturePostCategoryList extends React.Component<Props, State> {
    public constructor(props: Props) {
      super(props);
      this.state = {
        columns: [
          {
            title: '#',
            dataIndex: 'id',
            render: (text: any, record: any, index: number) => `${index + 1}`,
          },
          { title: '名称', dataIndex: 'name', sorter: true },
          { title: '创建日期', dataIndex: 'createTime', sorter: true },
          { title: '最后修改日期', dataIndex: 'updateTime', sorter: true },
          {
            title: '操作', dataIndex: 'action', render: (text: any, record: any) => (
              <div className="table-data-action-container">
                <Link to={`/system/feature/postCategory/operator/${record.id}`}>编辑</Link>
                <Divider type="vertical"/>
                <span onClick={() => this.deleteData(record)}>删除</span>
              </div>
            )
          }
        ],
        dataSource: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '100']
        },
        searchCondition: {},
        searchOrder: {},
        loading: false
      };
    }

    public componentDidMount = (): void => {
      this.refreshData();
    };

    /**
     * 刷新表格数据
     *
     */
    public refreshData = async () => {
      const { state } = this;

      this.setState({
        loading: true
      });

      const searchInfo = {
        page: state.pagination.current,
        pageSize: state.pagination.pageSize,
        ...state.searchCondition
      };
      if (state.searchOrder.hasOwnProperty('sortField')) {
        searchInfo.sortField = state.searchOrder.sortField;
        searchInfo.sortOrder = state.searchOrder.sortOrder;
      }

      // 获取表格数据
      const result: any = await api.postCategory.selectPostCategoryList(searchInfo);

      // 获取成功, 刷新数据
      this.setState({
        loading: false,
        dataSource: result.data.records,
        pagination: {
          ...state.pagination,
          current: result.data.current,
          pageSize: result.data.size,
          total: result.data.total
        }
      });
    };

    /**
     * 删除表格数据
     *
     * @param record
     */
    public deleteData = (record: any): void => {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        title: '确认删除此条记录？',
        content: <Tag color="#f50">{record.name}</Tag>,
        onOk: async () => {
          // loading
          this.setState({ loading: true });
          await api.postCategory.deletePostCategoryById(record.id);
          // 刷新表格数据
          this.refreshData();
        },
        onCancel() {
        },
      });
    };

    /**
     * 搜索表格数据
     *
     */
    public handleSearch = (e: React.FormEvent): void => {
      e.preventDefault();
      const { state, props } = this;
      props.form.validateFields(async (error, valueList) => {
        if (!error) {
          // 保存搜索条件
          this.setState({
            pagination: {
              ...state.pagination,
              current: 1,
              pageSize: 10
            },
            searchCondition: valueList
          }, () => {
            // 刷新表格数据
            this.refreshData();
          });
        }
      });
    };

    /**
     * 重置搜索参数
     *
     */
    public handleReset = (): void => {
      const { props } = this;
      // 保存搜索条件
      this.setState({
        pagination: {
          current: 1,
          pageSize: 10
        },
        searchCondition: {}
      }, () => {
        // 清空表单
        props.form.resetFields();
        // 刷新表格数据
        this.refreshData();
      });
    };

    /**
     * 表格的数据搜索条件发送变化
     *
     * @param currentPagination antd 分页对象
     * @param filters antd 过滤对象
     * @param sorter antd 排序对象
     */
    public handleTableChange = (currentPagination: any, filters: any, sorter: any): void => {
      const { state } = this;

      // 保存搜索条件
      const searchInfo: any = {
        pagination: {
          ...state.pagination,
          current: currentPagination.current,
          pageSize: currentPagination.pageSize
        }
      };

      // 搜索排序
      if (sorter.columnKey !== undefined) {
        searchInfo.searchOrder = {
          sortField: sorter.columnKey,
          sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc'
        };
      } else {
        searchInfo.searchOrder = {};
      }
      this.setState(searchInfo, () => {
        // 刷新表格数据
        this.refreshData();
      });
    };

    /**
     * 顶部操作容器
     *
     */
    public getOperationContainer = (): JSX.Element => {
      const { props } = this;
      return (
        <section className="data-operation-container">
          <section className="search-container">
            <Form onSubmit={this.handleSearch}>
              <Row className="search-field-container">
                <Col md={5}>
                  <Form.Item label="分类名称">
                    {props.form.getFieldDecorator('name', {
                      rules: []
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                </Col>
                <Col md={5} className="search-action-container">
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button onClick={this.handleReset}>清空</Button>
                </Col>
              </Row>
            </Form>
          </section>
          <section className="data-action-container">
            <Link to="/system/feature/postCategory/operator">
              <Button icon="plus" type="primary">添加</Button>
            </Link>
          </section>
        </section>
      );
    };

    public render = (): JSX.Element => {
      const { state } = this;
      return (
        <section className="list-container">
          {this.getOperationContainer()}
          <section className="data-container">
            <Table
              columns={state.columns}
              rowKey={(record: any) => record.id}
              dataSource={state.dataSource}
              pagination={state.pagination}
              loading={state.loading}
              onChange={this.handleTableChange}/>
          </section>
        </section>
      );
    };
  }
);
