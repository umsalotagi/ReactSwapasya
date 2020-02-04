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

import {Form_req_input, Form_input, Form_select, Form_datePicker} from "../shared_components/components1";


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
    if (this.props.hidden) {
      return <div> </div>
    }
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
      hideSearchPerson: false,
      hideViewPerson: true,
      hideEditPerson: true,
      personClicked: {}
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
  };

  viewPerson = (record) => {
    console.log("Clicked view person");
    console.log(record);
    this.setState({hideSearchPerson: true, hideViewPerson: false, hideEditPerson: true, personClicked: record});
  };

  editPerson = (record) => {
    console.log("edit person ...");
    console.log(record);
    this.setState({hideSearchPerson: true, hideViewPerson: true, hideEditPerson: false, personClicked: record});
  };

  deletePerson = (record) => {
    this.setState({personClicked: record});
  };

  back = () => {
    this.setState({hideSearchPerson: false, hideViewPerson: true, hideEditPerson: true});
  }

  render() {
    return (
      <div>
      <PersonSearchForm handleSubmit={this.handleSubmit} hidden={this.state.hideSearchPerson}/>
      <PersonTable data={this.state.data} viewPerson={this.viewPerson}
        editPerson={this.editPerson} deletePerson={this.deletePerson} hidden={this.state.hideSearchPerson}/>
      <EditPersonForm personData={this.state.personClicked} hidden={this.state.hideEditPerson} back={this.back} />
      <ViewPerson personData={this.state.personClicked} hidden={this.state.hideViewPerson} back={this.back}/>
      </div>
    );
  }
}

const View = ({text, record, viewPerson}) => {
  const viewClick = e => {
    viewPerson(record);
  }

  return (
    <a onClick={viewClick} >View</a>
  )
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
          <View text={text} record={record} viewPerson={this.props.viewPerson} />
          <Divider type="vertical" />
          <a onClick={() => {this.props.editPerson(record)}} >Edit</a>
          <Divider type="vertical" />
          <a onClick={() => {this.props.deletePerson(record)}} >Delete</a>
        </span>
      ),
    },
  ];

  render() {
    if (this.props.hidden) {
      return <div> </div>
    }
    return (
      <div>
      <Table rowKey="_id" columns={this.columns} dataSource={this.props.data} />
      </div>
    );
  }
}


class EditPerson extends React.Component {

  handleSubmit = () => {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {personData, hidden, back} = this.props;
    if (hidden) {
      return <div> </div>
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
        <div>
        <Button onClick={back} > Back </Button>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Divider orientation="left">Basic Details</Divider>
          <Form_select getFieldDecorator={getFieldDecorator} label='Role' field='role' initial='Single' options={['Single', 'Married']} />
          <Form_req_input getFieldDecorator={getFieldDecorator} label='Person ID' field='_id' msg='Please input id !'/>
          <Form_req_input getFieldDecorator={getFieldDecorator} label='First Name' field='fistName' msg='Please input First Name !'/>
          <Form_req_input getFieldDecorator={getFieldDecorator} label='Last Name' field='lastName' msg='Please input Last Name !'/>
          <Form_input getFieldDecorator={getFieldDecorator} label='Middle Name' field='middleName' />
          <Form_req_input getFieldDecorator={getFieldDecorator} label='Pnr No' field='_id' msg='Please input Pnr No!'/>
          <Form_req_input getFieldDecorator={getFieldDecorator} label='Email' field='email' msg='Please input Email!'/>
          <Form_input getFieldDecorator={getFieldDecorator} label='Mobile No' field='middleName' />
          <Form_select getFieldDecorator={getFieldDecorator} label='Marital Status' field='middleName' initial='Single' options={['Single', 'Married']} />
          <Form_datePicker getFieldDecorator={getFieldDecorator} label='Birth Date' field='bod' />

          <Divider orientation="left">Other Details</Divider>

          <Divider orientation="left">Address Details</Divider>
        </Form>
        </div>

    );
  }
}

const ViewPerson = ({personData, hidden, back}) => {
  if (hidden) {
    return <div> </div>
  }
  return (
    <div> </div>
  );
}

const EditPersonForm = Form.create({ name: 'customized_form_controls' })(EditPerson);

export default function TableList() {
  return (
    <div>
    <PersonModule/>
    </div>
  );
}
