/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 17:37:56
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-09 17:57:52
 * @Description:
 */
import React, { useEffect, useState } from 'react'

import { Button, DatePicker, Form, Input, InputNumber, message, Radio, Select, Space, Spin } from 'antd'

import dayjs from 'dayjs'
import { postMyUpdate } from '@apis/my'

import { MARITAL_STATUS_OPTIONS, DEGREE_OPTIONS, MONTHLY_SALARY_OPTIONS } from '@constants'

const { Item } = Form

const BaseInfo = ({ userInfo, setUserInfo, isEdit, setIsEdit }) => {
  const [formInstance] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [canSetValue, setCanSetValue] = useState(false)

  useEffect(() => {
    if (('nickname' in userInfo) && !canSetValue) {
      formInstance.setFieldsValue({ ...userInfo, birthday: userInfo.birthday ? dayjs(userInfo.birthday) : undefined })
      setCanSetValue(true)
    }
  }, [userInfo])

  const handleFinish = async (values) => {
    const params = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DD')
    }
    setLoading(true)
    try {
      const { code, msg } = await postMyUpdate(params)
      setLoading(false)
      if (code !== 0) {
        throw msg
      }
      message.success(msg, 1, () => {
        message.success('修改成功~')
        setIsEdit(false)
        setUserInfo({ ...userInfo, ...values })
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
        disabled={!isEdit}
        initialValues={{ ...userInfo, birthday: userInfo.birthday ? dayjs(userInfo.birthday) : undefined }}
      >
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
        <Item label="电话" name="telephone" rules={[
          {
            pattern: /^[1]+[3,8]+\d{9}$/,
            message: '请输入正确的电话格式'
          }
        ]}>
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="QQ/微信" name="qqOrWechat">
          <Input style={{ width: 300 }} />
        </Item>
        <Item label="邮箱" name="email" rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱格式'
          }
        ]}>
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
        {isEdit && <Item wrapperCol={{ span: 8, offset: 10 }}>
          <Space size="large">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="reset">
              重置
            </Button>
          </Space>
        </Item>}
      </Form>
    </Spin>
  )
}

export default BaseInfo
