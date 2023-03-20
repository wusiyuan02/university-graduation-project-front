/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 17:38:39
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-09 17:57:44
 * @Description:
 */
import { Button, Form, Input, message, Space, Spin } from 'antd'

import React, { useState } from 'react'

import { postPasswordUpdate } from '@apis/my'

const { Item } = Form

const PasswordEdit = ({ setIsEdit }) => {
  const [formInstance] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleFinish = async (values) => {
    setLoading(true)
    try {
      const { code, msg } = await postPasswordUpdate(values)
      setLoading(false)
      if (code !== 0) {
        throw msg
      }
      message.success(msg, 1, () => {
        message.success('修改成功~')
        setIsEdit(false)
      })
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Spin spinning={loading}>
      <Form labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 600, marginTop: 16 }}
        onFinish={handleFinish}
        form={formInstance}
        scrollToFirstError={true}
        initialValues={{}}>
        <Item label="旧密码" name="oldPassword"
          rules={[
            {
              required: true,
              message: '请输入旧密码'
            }
          ]}>
          <Input type="password" placeholder="请输入密码" />
        </Item>
        <Item label="新密码" name="newPassword"
          rules={[
            {
              required: true,
              message: '请输入新密码'
            }, {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.\d){6,16}$/,
              message: '新密码要求6~16位长度且必须包含大小写字母和数字'
            }
          ]}>
          <Input type="password" placeholder="请输入密码" />
        </Item>
        <Item label="再次输入新密码" name="newRePassword" rules={[
          {
            required: true,
            message: '请再次输入新密码'
          }, {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.\d){6,16}$/,
            message: '新密码要求6~16位长度且必须包含大小写字母和数字'
          }
        ]}>
          <Input type="password" placeholder="请输入密码" />
        </Item>
        <Item wrapperCol={{ span: 8, offset: 10 }}>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">
              重置
            </Button>
          </Space>
        </Item>
      </Form>
    </Spin>
  )
}

export default PasswordEdit
