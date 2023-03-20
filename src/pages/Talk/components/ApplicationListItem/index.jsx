import React, { useEffect, useState } from 'react'

import { Avatar, message, Modal, Space, Tag } from 'antd'
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { COLOR_LIST, TAGS_OPTIONS } from '@constants'
import {
  postFriendApplicationAgree,
  postFriendApplicationRefuse,
  postUserList
} from '@apis/talk'

const ApplicationListItem = ({
  item,
  index,
  onChange,
  setUserInfo,
  setUserInfoVisible
}) => {
  const { sender: senderUsername, _id } = item

  const [senderUserInfo, setSenderUserInfo] = useState({
    username: senderUsername
  })

  const getSenderUserInfo = async () => {
    try {
      const { code, data, msg } = await postUserList(senderUsername)
      if (code !== 0) {
        throw msg
      }
      if (data.length === 0) {
        return
      }
      setSenderUserInfo(data[0])
    } catch (err) {
      message.error(err)
    }
  }
  useEffect(() => {
    getSenderUserInfo()
  }, [])

  const { avatar, nickname, username, signature, personTags } = senderUserInfo

  const handleApplicationAgree = () => {
    Modal.confirm({
      content: '是否同意 ' + (nickname || username) + ' 的好友申请？',
      onOk: () =>
        postFriendApplicationAgree({ _id }).then(() => {
          onChange(index)
          message.success('同意好友申请成功！')
        })
    })
  }

  const handleApplicationRefuse = () => {
    Modal.confirm({
      content: '是否拒绝 ' + (nickname || username) + ' 的好友申请？',
      onOk: () =>
        postFriendApplicationRefuse({ _id }).then(() => {
          onChange(index)
          message.success('拒绝好友申请成功！')
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
            {personTags?.map((tagValue, index) => (
              <Tag color={COLOR_LIST[index]} key={tagValue}>
                {TAGS_OPTIONS.find(option => option.value === tagValue)
                  ?.label || tagValue}
              </Tag>
            ))}
          </Space>
        </div>
        <Space>
          <span>个性签名：{signature || '暂无'}</span>
        </Space>
      </div>
      <Space>
        <CheckCircleOutlined
          style={{ cursor: 'pointer', fontSize: 18, color: 'red' }}
          onClick={handleApplicationAgree}
        />
        <CloseCircleOutlined
          style={{ cursor: 'pointer', fontSize: 18, color: 'green' }}
          onClick={handleApplicationRefuse}
        />
      </Space>
    </div>
  )
}

export default ApplicationListItem
