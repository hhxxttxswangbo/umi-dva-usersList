import React, { useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd';


export const UserModal = (props) => {
  const [form] = Form.useForm();

  //报错：Cannot update a component (`FormItem`) while rendering a different component (`UserModal`). 
  // 在compoentDidMount阶段才把值给他
  useEffect(() => {
    form.setFieldsValue(props.record);
  }, [props.visible])  //数组里内容变化时，执行箭头函数里代码

  const onOk = () => {
    form.submit();
  }

  //这个组件没办法直接与组件进行沟通，成功要放在index里
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal title="Basic Modal" visible={props.visible} onOk={onOk} onCancel={props.closeHandler} forceRender>
        <Form
          name="basic"
          form={form}
          onFinish={props.onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Create Time"
            name="create_time"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
