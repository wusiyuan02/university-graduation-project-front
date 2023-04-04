import React, { useState } from 'react'
import { Input, Layout } from 'antd'
import MessageBubbles from '../MessageBubbles'

const userInfo = JSON.parse(localStorage.getItem('user_info'))

const ChatBox = ({ chatPersonInfo, onMessageChange, messageList }) => {
  const [messageContent, setMessageContent] = useState('')

  const handleSendMessage = value => {
    onMessageChange({
      receiverUsername: chatPersonInfo.username,
      content: value
    })
    setMessageContent('')
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
        {(messageList || []).map(messageItem => <MessageBubbles key={messageItem._id} username={userInfo.username} {...messageItem} />)}
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
