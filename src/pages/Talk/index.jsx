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

const socket = io('http://localhost:3000', { transports: ['websocket'] })

const userInfo = JSON.parse(localStorage.getItem('user_info'))

socket.on('connect', () => {
  console.log('链接成功！')
  socket.emit('login', { username: userInfo.username })
})

const Talk = () => {
  const [addFriendsVisible, setAddFriendsVisible] = useState(false)
  const [friendsApplicationVisible, setFriendsApplicationVisible] =
    useState(false)
  const [userInfoVisible, setUserInfoVisible] = useState(false)
  const [applicationList, setApplicationList] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [personInfo, setPersonInfo] = useState(null)
  const [chatInfo, setChatInfo] = useState({})
  const [messageList, setMessageList] = useState({})

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
      console.log(data)
      setMessageList(data)
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
        style={{
          width: 300,
          height: 'calc(100vh - 96px)',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 42
            }}
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
              style={{
                display: 'flex',
                height: 76,
                alignItems: 'center',
                cursor: 'pointer',
                background: chatInfo.username === username && '#ededed',
                paddingLeft: 16
              }}
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
            </div>
          )
        }}
      />
      <ChatBox
        chatPersonInfo={chatInfo}
        onMessageChange={handleMessageChange}
        messageList={messageList[chatInfo.username]}
      />
      {personInfo && (
        <UserInfoModal
          visible={userInfoVisible}
          userInfo={personInfo}
          onOk={() => setUserInfoVisible(false)}
          onCancel={() => setUserInfoVisible(false)}
        />
      )}
      {friendsApplicationVisible && (
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
      )}
      {addFriendsVisible && (
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
      )}
    </div>
  )
}

export default Talk
