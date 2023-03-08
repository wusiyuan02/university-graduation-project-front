# a simple web program config about webpack
## has config list
- clean-webpack-plugin 删除上一次bundle
- html-webpack-plugin 指定html模板
- react and react-dom 直接npm i即可
- jsx 完成babel-loader配置
- source-map
- css and less...css module
1. 添加.module即可启用css module，原理是给每个类名随机生成一个字符串
2. mini-css-extract-plugin 将css文件以外链的方式加载至html中
3. css-minimizer-webpack-plugin 将css文件中的空格删除
4. 添加less + less-loader可支持less文件的转换

## waiting config list
- mock...

- jest...

import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Layout, Radio, Select } from 'antd'
import { MARITAL_STATUS_OPTIONS, TAGS_OPTIONS, DEGREE_OPTIONS, MONTHLY_SALARY_OPTIONS } from '@constants'

const { Item } = Form
const My = () => {
  const [formInstance] = Form.useForm()

  const handleFinish = (values) => { console.log('sww', values) }
  return (
    <Layout style={{ height: '100%', minHeight: 'calc(100vh - 96px)' }}>
      <Layout.Sider width="800" style={{ background: '#fff', padding: '16px 0' }}>
        <Form
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleFinish}
          form={formInstance}
          scrollToFirstError={true}
        >
          <Item label="昵称" name="nickname"
            rules={[
              {
                required: true,
                message: '请输入昵称'
              }
            ]}>
            <Input style={{ width: 300 }} />
          </Item>
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
          <Item label="个性签名" name="signature">
            <Input.TextArea style={{ width: 300 }} maxLength={500} />
          </Item>

          <Item label="请选择描述自己的标签" name="personTags" tooltip={<div>你还想不想找妹子？</div>}>
            <Select style={{ width: 300 }} mode="tags" options={TAGS_OPTIONS} placeholder="支持手动输入" />
          </Item>
          <Item label="请选择描述心仪的标签" name="loveTags" tooltip={<div>选择心仪的标签，本人会帮你更准确的推送哦~~</div>}>
            <Select style={{ width: 300 }} mode="tags" options={TAGS_OPTIONS} placeholder="支持手动输入" />
          </Item>
          <Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Layout.Sider>
      <Layout.Content>
      </Layout.Content>
    </Layout >

  )
}

export default My
