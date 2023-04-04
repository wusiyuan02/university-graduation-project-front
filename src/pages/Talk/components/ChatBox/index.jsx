import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import { Input, Layout } from 'antd'
import MessageBubbles from '../MessageBubbles'

import style from './index.module.less'

const userInfo = JSON.parse(localStorage.getItem('user_info'))

const ChatBox = ({ socket, chatPersonInfo, onMessageChange, messageList, messageFlagList, setMessageFlagList }) => {
  const [messageContent, setMessageContent] = useState('')

  useEffect(() => {
    setMessageFlagList({ ...messageFlagList, [chatPersonInfo.username]: true })
    socket.emit('readMessage', { sendUsername: chatPersonInfo.username, receiverUsername: userInfo.username })
  }, [chatPersonInfo.username])

  const handleSendMessage = value => {
    onMessageChange({
      receiverUsername: chatPersonInfo.username,
      content: value
    })
    setMessageContent('')
  }

  let lastMessageTimeStr = ''

  return (
    <Layout className={style.chatBox} >
      <Layout.Header style={{ textAlign: 'center', color: '#fff' }}>
        {chatPersonInfo.nickname || chatPersonInfo.username}
      </Layout.Header>
      <Layout.Content style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {(messageList || []).map((messageItem, index) => {
          const lastMessageTime = dayjs(lastMessageTimeStr)

          if (index !== 0 && dayjs(messageItem.sendTime).isAfter(lastMessageTime) && dayjs(messageItem.sendTime).isBefore(lastMessageTime.add(3, 'm'))) {
            lastMessageTimeStr = messageItem.sendTime
            return (<MessageBubbles key={messageItem._id} username={userInfo.username} {...messageItem} />)
          } else {
            lastMessageTimeStr = messageItem.sendTime
            return <>
              <div className={style.time}>{messageItem.sendTime}</div>
              <MessageBubbles key={messageItem._id} username={userInfo.username} {...messageItem} />
            </>
          }
        })}
      </Layout.Content>
      <Layout.Footer style={{ padding: 16 }}>
        <Input.Search
          enterButton="发送"
          value={messageContent}
          onChange={({ target: { value } }) => {
            setMessageContent(value)
          }}
          onSearch={handleSendMessage} />
      </Layout.Footer>
    </Layout>
  )
}

export default ChatBox
