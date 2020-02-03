import React from "react";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { Table, Divider, Tag } from 'antd';
import {searchPersonByID, searchPersonByName} from './PersonService';

// Issue 1 : if role property is not given, this causes an error

import {Form_input} from "../shared_components/components1";


const { Option } = Select;

class Demo extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        this.props.handleSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="Search By: ">
          {getFieldDecorator('searchby', { initialValue: "name"})
            (<Select size={300}>
              <Option value="name">Name</Option>
              <Option value="id">ID</Option>
            </Select>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('text', {
              rules: [
                {
                  required: true,
                  message: 'Please input person details to search',
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        </div>
    );
  }
}

const PersonSearchForm = Form.create({ name: 'customized_form_controls' })(Demo);

class PersonModule extends React.Component {
  constructor() {
        super();
    this.state = {
      data: [],
    }
  }

  handleSubmit = (values) => {
    if (values.searchby === 'name') {
      searchPersonByName(values.text).then((data1) =>  {
        data1.map((da) => da.name = da.firstName + " " + da.lastName);
        this.setState({data: data1});
      });
    } else if (values.searchby === 'id') {
      searchPersonByID(values.text).then((data1) => {
        data1.map((da) => da.name = da.firstName + " " + da.lastName);
        this.setState({data: [data1]})
      });
    }
  }

  render() {
    return (
      <div>
      <PersonSearchForm handleSubmit={this.handleSubmit}/>
      <PersonTable data={this.state.data}/>
      </div>
    );
  }
}

class PersonTable extends React.Component {

  columns = [
    {
      title: 'PersonID',
      dataIndex: '_id',
      key: '_id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <span>
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
              </span>
            );
      },
    },
    {
      title: 'Batch',
      dataIndex: 'batchName',
      key: 'batchName',
    },
    {
      title: 'Course Year',
      dataIndex: 'courseyear',
      key: 'courseyear',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>View</a>
          <Divider type="vertical" />
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  render() {
    return (
      <div>
      <Table rowKey="_id" columns={this.columns} dataSource={this.props.data} />
      </div>
    );
  }
}



export default function TableList() {
  return (
    <div>
    <PersonModule/>
    </div>
  );
}
