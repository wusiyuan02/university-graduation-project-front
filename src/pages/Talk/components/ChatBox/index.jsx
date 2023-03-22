import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Input, Layout } from 'antd'
import MessageBubbles from '../MessageBubbles'
import dayjs from 'dayjs'

const userInfo = JSON.parse(localStorage.getItem('user_info'))

const socket = io('http://localhost:3000', { transports: ['websocket'] })

socket.on('connect', () => {
  console.log('链接成功！')
})

const ChatBox = ({ chatPersonInfo }) => {
  const [sendMessageInfo, setSendMessageInfo] = useState({
    sendUsername: userInfo.username
  })

  let [messageList, setMessageList] = useState([])
  useEffect(() => {
    setSendMessageInfo({
      ...sendMessageInfo,
      receiverUsername: chatPersonInfo.username
    })
  }, [chatPersonInfo.username])

  socket.on('receiveMessage', (messageInfo) => {
    messageList = [...messageList, messageInfo]
    setMessageList(messageList)
  })

  const handleSendMessage = value => {
    socket.emit('sendMessage', {
      ...sendMessageInfo,
      content: value,
      sendTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, (response) => {
      messageList = [...messageList, response]
      setMessageList(messageList)
      setSendMessageInfo({
        ...sendMessageInfo,
        content: '',
        sendTime: undefined
      })
    })
  }

  return (
    <Layout
      style={{
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        border: '1px solid #d9d9d9',
        borderLeft: 'none',
        overflow: 'hidden'
      }}
    >
      <Layout.Header style={{ textAlign: 'center', color: '#fff' }}>
        {chatPersonInfo.nickname || chatPersonInfo.username}
      </Layout.Header>
      <Layout.Content style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {messageList.map(messageItem => <MessageBubbles key={messageItem._id} username={userInfo.username} socket={socket} {...messageItem} />)}
      </Layout.Content>
      <Layout.Footer style={{ padding: 16 }}>
        <Input.Search
          enterButton="发送"
          value={sendMessageInfo.content}
          onChange={({ target: { value } }) => {
            setSendMessageInfo({
              ...sendMessageInfo,
              content: value
            })
          }}
          onSearch={handleSendMessage} />
      </Layout.Footer>
    </Layout>
  )
}

export default ChatBox
