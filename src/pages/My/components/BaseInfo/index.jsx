/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 17:37:56
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-08 19:55:42
 * @Description:
 */
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Select, Space, Spin } from 'antd'
import { MARITAL_STATUS_OPTIONS, DEGREE_OPTIONS, MONTHLY_SALARY_OPTIONS } from '@constants'
// import dayjs from 'dayjs'

import { postMyEdit } from '@apis/my'
const { Item } = Form

const BaseInfo = ({ userInfo }) => {
  const [loading, setLoading] = useState(false)
  const [formInstance] = Form.useForm()

  const handleFinish = async (values) => {
    const params = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DD')
    }
    setLoading(true)
    try {
      const { code, msg } = await postMyEdit(params)
      setLoading(false)
      if (code !== '0') {
        throw msg
      }
      message.success(msg, 1, () => {
      })
    } catch (err) {
      message.error(err)
    }
  }

  useEffect(() => {
    formInstance.setFieldsValue({ ...userInfo })
  }, [])

  return (
    <Spin spinning={loading}>
      <Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
        form={formInstance}
        scrollToFirstError={true}>
        <Item label="我是" name="sex"
          rules={[
            {
              required: true,
              message: '请选择性别'
            }
          ]}
          defaultValue="m"
        >
          <Radio.Group>
            <Radio value="m">男</Radio>
            <Radio value="w">女</Radio>
          </Radio.Group>
        </Item>
        <Item label="昵称" name="nickname"
          rules={[
            {
              required: true,
              message: '请输入昵称'
            }
          ]}>
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="生日" name="birthday"
          rules={[
            {
              required: true,
              message: '请选择生日'
            }
          ]}>
          <DatePicker style={{ width: 300 }} />
        </Item>
        <Item label="身高" name="height"
          rules={[
            {
              required: true,
              message: '请输入身高'
            }
          ]}>
          <InputNumber addonAfter={<span>厘米(cm)</span>} style={{ width: 300 }} />
        </Item>
        <Item label="电话" name="telephone">
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="QQ/微信" name="qqOrWechat">
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="邮箱" name="email">
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="婚恋状况" name="maritalStatus"
          rules={[
            {
              required: true,
              message: '请选择婚恋状况'
            }
          ]}>
          <Select style={{ width: 300 }} options={MARITAL_STATUS_OPTIONS} />
        </Item>
        <Item label="学历" name="degree"
          rules={[
            {
              required: true,
              message: '请选择学历'
            }
          ]}>
          <Select style={{ width: 300 }} options={DEGREE_OPTIONS} />
        </Item>
        <Item label="月薪" name="monthlySalary">
          <Select style={{ width: 300 }} options={MONTHLY_SALARY_OPTIONS} />
        </Item>
        <Item wrapperCol={{ span: 12, offset: 6 }}>
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
    </Spin>)
}

export default BaseInfo
