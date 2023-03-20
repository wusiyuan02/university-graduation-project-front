import React from 'react'

import { Avatar, Modal, Tabs, Typography } from 'antd'
import BaseInfo from './components/BaseInfo'
import PersonalInfo from './components/PersonalInfo'
import { UserOutlined } from '@ant-design/icons'

const UserInfoModal = ({ visible, userInfo, ...props }) => {
  return (
    <Modal open={visible} {...props}>
      <Avatar src={userInfo.avatar} icon={<UserOutlined />} size={120} />
      <Typography.Title level={3}>
        {userInfo.nickname || userInfo.username}
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 32 }}>
        {userInfo.signature}
      </Typography.Text>
      <Tabs
        items={[
          {
            key: 'base',
            label: '基本信息',
            children: <BaseInfo userInfo={userInfo} />
          },
          {
            key: 'personal',
            label: '个性信息',
            children: <PersonalInfo userInfo={userInfo} />
          }
        ]}
      />
    </Modal>
  )
}

export default UserInfoModal
