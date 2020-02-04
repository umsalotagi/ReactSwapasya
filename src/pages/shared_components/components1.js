import React from "react";
import {
  Form,
  DatePicker,
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

export const Form_input1 = ({getFieldDecorator, label, req, msg}) => {
  return (
  <Col span={12} >
    <Form.Item label={label}>
      {getFieldDecorator(`${label}`, {
        rules: [
          {
            required: `${req}`,
            message: `${msg}`,
          },
        ],
      })(<Input />)}
    </Form.Item>
  </Col>
  );
}

export const Form_req_input = ({getFieldDecorator, label, field, msg}) => {
  return (
    <Col span={12} >
      <Form.Item label={label}>
        {getFieldDecorator(`${field}`, {
          rules: [
            {
              required: true,
              message: `${msg}`,
            }
          ],
        }) (<Input />)}
      </Form.Item>
    </Col>
  )
}

export const Form_input = ({getFieldDecorator, label, field}) => {
  return (
    <Col span={12} >
      <Form.Item label={<span>{label}</span>}>
        {getFieldDecorator(`${field}`, {

        }) (<Input />)}
      </Form.Item>
    </Col>
  )
}

const { Option } = Select;
export const Form_select = ({getFieldDecorator, label, field, initial, options}) => {
  return (
    <Col span={12} >
      <Form.Item label={label}>
      {getFieldDecorator(`${field}`, { initialValue: `${initial}`})
        (<Select size={300}>
          {
            options.map((op) => <Option value={op.toLowerCase()}>{op}</Option>)
          }
        </Select>)}
      </Form.Item>
    </Col>
  )
}

const config = {
      rules: [{ type: 'object'}],
};
export const Form_datePicker = ({getFieldDecorator, label, field}) => {
  return (
    <Col span={12} >
      <Form.Item label={label}>
        {getFieldDecorator(`${field}`, config)(<DatePicker />)}
      </Form.Item>
    </Col>
  )
}
