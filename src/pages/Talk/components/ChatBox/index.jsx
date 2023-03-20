import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { Input, Layout } from 'antd'

const socket = io('http://localhost:3000', { transports: ['websocket'] })

socket.on('ok', () => {
  // 用户进入时触发
  console.log('ok')
})

const ChatBox = ({ chatPersonInfo }) => {
  socket.on('connect', () => {
    console.log('OK')
  })
  // socket.on('connect', () => {
  //   // 用户进入时触发
  //   const engine = socket.io.engine
  //   console.log(engine.transport.name)
  // })
  // socket.on('connect_err', () => {
  //   // 用户进入时触发
  //   const engine = socket.io.engine
  //   console.log(engine.transport.name)
  // })

  // console.log(socket)
  useEffect(() => {
    console.log(socket.connected)
  }, [socket.connected])

  const handleSendMessage = value => {}

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
      <Layout.Content></Layout.Content>
      <Layout.Footer style={{ padding: 16 }}>
        <Input.Search enterButton="发送" onSearch={handleSendMessage} />
      </Layout.Footer>
    </Layout>
  )
}

export default ChatBox
