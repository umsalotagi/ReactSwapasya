import React from "react";
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

export const Form_input = ({getFieldDecorator, label, req, msg}) => {

  return (
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
  );
}

//export {Form_input_req };
