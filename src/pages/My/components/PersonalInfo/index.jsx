/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 17:38:17
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-09 17:57:02
 * @Description:
 */
import React, { useEffect, useState } from 'react'

import { Button, Form, Input, message, Select, Space, Spin } from 'antd'

import { postMyUpdate } from '@apis/my'
import { TAGS_OPTIONS } from '@constants'
const { Item } = Form

const PersonalInfo = ({ userInfo, setUserInfo, isEdit, setIsEdit }) => {
  const [formInstance] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [canSetValue, setCanSetValue] = useState(false)

  useEffect(() => {
    if (('nickname' in userInfo) && !canSetValue) {
      formInstance.setFieldsValue({ ...userInfo })
      setCanSetValue(true)
    }
  }, [userInfo])

  const handleFinish = async (values) => {
    setLoading(true)
    try {
      const { code, msg } = await postMyUpdate(values)
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
        initialValues={{ ...userInfo }}
      >
        <Item label="个性签名" name="signature">
          <Input.TextArea style={{ width: 260 }} maxLength={500} placeholder="最多输入500个字符" />
        </Item>

        <Item label="请选择描述自己的标签" name="personTags" tooltip={<div>你还想不想找妹子？</div>}>
          <Select style={{ width: 260 }} mode="tags" options={TAGS_OPTIONS} placeholder="支持手动输入" />
        </Item>
        <Item label="请选择描述心仪的标签" name="loveTags" tooltip={<div>选择心仪的标签，本人会帮你更准确的推送哦~~</div>}>
          <Select style={{ width: 260 }} mode="tags" options={TAGS_OPTIONS} placeholder="支持手动输入" />
        </Item>
        <Item label={<span>内<span style={{ color: 'red' }}>♥</span>独白</span>} name="innerMonologue" tooltip={<div>还羞涩起来了？</div>}>
          <Input.TextArea style={{ width: 260 }} maxLength={260} placeholder="sir, say your idea!" />
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

export default PersonalInfo
