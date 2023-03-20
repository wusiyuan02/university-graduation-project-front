import React from 'react'

import { Avatar, message, Modal, Space, Tag } from 'antd'
import { UserOutlined, UserAddOutlined } from '@ant-design/icons'

import { COLOR_LIST, TAGS_OPTIONS } from '@constants'
import { postAddFriendRequest } from '@apis/talk'
const FriendListItem = ({ item, setUserInfo, setUserInfoVisible }) => {
  const { avatar, nickname, username, telephone, email, personTags } = item

  const handleAddFriend = () => {
    Modal.confirm({
      content: '是否添加 ' + username + ' 为你的好友？',
      onOk: () =>
        postAddFriendRequest(username).then(() => {
          message.success('添加好友成功！')
        })
    })
  }
  return (
    <div style={{ display: 'flex', marginTop: 16, alignItems: 'center' }}>
      <Avatar
        src={avatar}
        icon={<UserOutlined />}
        size={60}
        onClick={e => {
          e.stopPropagation()
          setUserInfo(item)
          setUserInfoVisible(true)
        }}
      />
      <div style={{ paddingTop: 4, marginLeft: 16, flex: 1 }}>
        <div style={{ marginBottom: 4 }}>
          <Space>
            <h5>{nickname || username}</h5>
            {personTags.map((tagValue, index) => (
              <Tag color={COLOR_LIST[index]} key={tagValue}>
                {TAGS_OPTIONS.find(option => option.value === tagValue)
                  ?.label || tagValue}
              </Tag>
            ))}
          </Space>
        </div>
        <Space>
          <span>邮箱：{email || '暂无'}</span>
          <span>联系电话：{telephone || '暂无'}</span>
        </Space>
      </div>
      <UserAddOutlined
        style={{ cursor: 'pointer' }}
        onClick={handleAddFriend}
      />
    </div>
  )
}

export default FriendListItem
