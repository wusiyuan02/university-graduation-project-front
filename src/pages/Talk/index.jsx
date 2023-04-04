import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'
import dayjs from 'dayjs'
import { getFriendApplication, postFriendsList, getFriendTalkMessage } from '@apis/talk'

import { Avatar, List, message, Modal, Space } from 'antd'
import {
  UsergroupAddOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import UserInfoModal from '@components/UserInfoModal'
import ChatBox from './components/ChatBox'
import SearchFriendsModal from './components/SearchFriendsModal'
import FriendsApplicationModal from './components/FriendsApplicationModal'

import style from './index.module.less'
const socket = io('http://localhost:3000', { transports: ['websocket'] })

const userInfo = JSON.parse(localStorage.getItem('user_info'))

socket.on('connect', () => {
  socket.emit('login', { username: userInfo.username })
})

const Talk = () => {
  const [addFriendsVisible, setAddFriendsVisible] = useState(false)
  const [friendsApplicationVisible, setFriendsApplicationVisible] = useState(false)
  const [userInfoVisible, setUserInfoVisible] = useState(false)
  // 描述好友申请弹窗
  const [applicationList, setApplicationList] = useState([])
  // 描述好友列表
  const [friendsList, setFriendsList] = useState([])
  // 描述个人信息弹窗
  const [personInfo, setPersonInfo] = useState(null)
  // 聊天框个人信息
  const [chatInfo, setChatInfo] = useState({})
  // 消息列表
  const [messageList, setMessageList] = useState({})
  // 标记 是否有新消息
  const [messageFlagList, setMessageFlagList] = useState({})

  useEffect(() => {
    getApplicationList()
    getFriendsList()
    getMessageList()
  }, [])

  const getMessageList = async () => {
    try {
      const { code, data, msg } = await getFriendTalkMessage()
      if (code !== 0) {
        throw msg
      }
      if (data.length === 0) {
        return
      }
      const { messageData, flagData } = data
      setMessageList(messageData)
      setMessageFlagList(flagData)
    } catch (err) {
      message.error(err)
    }
  }

  // 接受信息的回调函数
  socket.on('receiveMessage', (messageInfo) => {
    const { sendUsername, receiverUsername } = messageInfo
    const nextMessageList = { ...messageList }
    const messageListKey = sendUsername === userInfo.username ? receiverUsername : sendUsername
    if ([messageListKey] in nextMessageList) {
      nextMessageList[messageListKey] = [...nextMessageList[messageListKey], messageInfo]
    } else {
      nextMessageList[messageListKey] = [messageInfo]
    }
    setMessageList(nextMessageList)
    setMessageFlagList({ ...message, [sendUsername]: false })
  })

  // 获取好友列表
  const getFriendsList = async () => {
    try {
      const { code, data, msg } = await postFriendsList()
      if (code !== 0) {
        throw msg
      }
      if (data.length === 0) {
        return
      }
      setFriendsList(data)
      setChatInfo(data[0])
    } catch (err) {
      message.error(err)
    }
  }
  // 获取好友申请列表
  const getApplicationList = async () => {
    try {
      const { code, data, msg } = await getFriendApplication()
      if (code !== 0) {
        throw msg
      }
      setApplicationList(data)
    } catch (err) {
      message.error(err)
    }
  }

  // 发送信息
  const handleMessageChange = (sendMessageInfo) => {
    socket.emit('sendMessage', {
      sendUsername: userInfo.username,
      ...sendMessageInfo,
      sendTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, (response) => {
      console.log(response)
      const nextMessageList = { ...messageList }
      nextMessageList[sendMessageInfo.receiverUsername] = [...nextMessageList[sendMessageInfo.receiverUsername] || [], response]
      setMessageList(nextMessageList)
    })
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 96px)' }}>
      <List
        bordered={true}
        className={style.leftList}
        header={
          <div
            className={style.leftAsideHeader}
          >
            <h3>好友列表</h3>
            <Space size={16}>
              <MailOutlined
                style={{
                  fontSize: 16,
                  cursor: 'pointer',
                  color: applicationList?.length > 0 && 'red'
                }}
                onClick={() => setFriendsApplicationVisible(true)}
              />
              <UsergroupAddOutlined
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setAddFriendsVisible(true)}
              />
            </Space>
          </div>
        }
        dataSource={friendsList}
        renderItem={item => {
          const { avatar, nickname, username } = item
          return (
            <div
              className={style.leftBox}
              style={{ background: chatInfo.username === username && '#ededed' }}
              onClick={() => {
                setChatInfo(item)
              }}
            >
              <Avatar
                src={avatar}
                icon={<UserOutlined />}
                size={60}
                onClick={e => {
                  e.stopPropagation()
                  setPersonInfo(item)
                  setUserInfoVisible(true)
                }}
              />
              <div style={{ paddingTop: 4, marginLeft: 16, flex: 1 }}>
                <div style={{ marginBottom: 4 }}>
                  <h5>{nickname || username}</h5>
                </div>
              </div>
              {messageFlagList[username] === false && <div className={style.redDot}></div>}
            </div>
          )
        }}
      />
      < ChatBox
        socket={socket}
        chatPersonInfo={chatInfo}
        onMessageChange={handleMessageChange}
        messageList={messageList[chatInfo.username]}
        messageFlagList={messageFlagList}
        setMessageFlagList={setMessageFlagList}
      />
      {personInfo && (
        <UserInfoModal
          visible={userInfoVisible}
          userInfo={personInfo}
          onOk={() => setUserInfoVisible(false)}
          onCancel={() => setUserInfoVisible(false)}
        />
      )}
      {
        friendsApplicationVisible && (
          <Modal
            title="好友申请"
            width={800}
            open={friendsApplicationVisible}
            onOk={() => setFriendsApplicationVisible(false)}
            onCancel={() => setFriendsApplicationVisible(false)}
          >
            <FriendsApplicationModal
              listData={applicationList}
              onListChange={setApplicationList}
              setUserInfo={setPersonInfo}
              setUserInfoVisible={setUserInfoVisible}
            />
          </Modal>
        )
      }
      {
        addFriendsVisible && (
          <Modal
            title="添加好友"
            width={800}
            open={addFriendsVisible}
            onOk={() => setAddFriendsVisible(false)}
            onCancel={() => setAddFriendsVisible(false)}
          >
            <SearchFriendsModal
              setUserInfo={setPersonInfo}
              setUserInfoVisible={setUserInfoVisible}
            />
          </Modal>
        )
      }
    </div >
  )
}

export default Talk
