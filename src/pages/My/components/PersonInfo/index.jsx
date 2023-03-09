
import React, { useState } from 'react'

import { Avatar, Card, Col, Row, Typography, Upload, Button, Space } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'

import style from './index.module.less'

const PersonInfo = ({ userInfo }) => {
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleUploadChange = ({ file }) => {
    if (file.status === 'done') {
      setAvatarUrl(file.response.data)
    }
  }

  return (
    <Card title="个人信息" style={{ minHeight: 'calc(100vh - 128px)' }} bodyStyle={{ textAlign: 'center' }}>
      <Space style={{ display: 'flex', marginBottom: 16, paddingLeft: '42%', alignItems: 'center' }}>
        <Avatar src={avatarUrl || userInfo.avatar} icon={<UserOutlined />} size={120} />
        <ImgCrop rotate >
          <Upload
            action="http://localhost:9000/api/my/avatarUpdate"
            maxCount={1}
            onChange={handleUploadChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>更换头像</Button>
          </Upload>
        </ImgCrop>
      </Space>
      <Typography.Title level={3} style={{ marginBottom: 32 }}>{userInfo.nickname || userInfo.username}</Typography.Title>
      <Row style={{ borderBottom: '1px solid #f0f0f0' }}>
        <Col className={style.antCol} span={6}>昵称:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.nickname}</Col>
        <Col className={style.antCol} span={6}>用户名:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.username}</Col>
        <Col className={style.antCol} span={6}>个性签名:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.signature}</Col>
        <Col className={style.antCol} span={6}>电话:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.telephone}</Col>
        <Col className={style.antCol} span={6}>QQ/微信:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.qqOrWechat}</Col>
        <Col className={style.antCol} span={6}>邮箱:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.email}</Col>
        <Col className={style.antCol} span={6}>注册时间:</Col>
        <Col className={style.antColContent} span={18}>{userInfo.registerTime}</Col>
      </Row>
    </Card >
  )
}

export default PersonInfo
