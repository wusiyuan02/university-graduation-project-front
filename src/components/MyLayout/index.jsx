import React, { createContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

import style from './index.module.less'
import { Avatar, Layout, Spin } from 'antd'
import MyMenu from './components/MyMenu'
import LoginOut from './components/LoginOut'

const { Header, Content } = Layout
const userInfo = JSON.parse(localStorage.getItem('user_info'))

const socket = io('http://localhost:3000', { transports: ['websocket'] })
export const SocketContext = createContext()

socket.on('connect', () => {
  socket.emit('login', { username: userInfo.username })
})

const MyLayout = () => {
  const navigate = useNavigate()
  const handleGoDetail = () => {
    navigate('/my')
  }
  return (
    <SocketContext.Provider value={{ socket }}>
      <Layout>
        <Header className={style.layoutHeader}>
          <div className={style.logo}></div>
          <div className={style.titleName}>不换</div>
          <MyMenu />
          <LoginOut />
          <div className={style.name} onClick={handleGoDetail}>
            {userInfo.nickname || userInfo.username}
          </div>
          <Avatar
            src={userInfo.avatar}
            size="large"
            style={{ marginLeft: 16 }}
          />
        </Header>
        <Content
          style={{
            padding: '16px',
            minHeight: 'calc(100vh - 64px)',
            background: '#fff'
          }}
        >
          <React.Suspense fallback={<Spin />}>
            <Outlet />
          </React.Suspense>
        </Content>
      </Layout>
    </SocketContext.Provider>
  )
}

export default MyLayout
