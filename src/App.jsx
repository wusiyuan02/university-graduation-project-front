import React from 'react'

import style from './app.module.less'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import MyMenu from './components/MyMenu'

const { Header, Content } = Layout

const App = () => {
  return (
    <Layout>
      <Header className={style.layoutHeader}>
      <div className={style.logo}></div>
        <div className={style.titleName}>不换</div>
        <MyMenu />
      </Header>
      <Content
        style={{
          padding: '0 50px',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0'
          }}
        >
        </Breadcrumb>
          <Routes>
            <Route key="default" path="/" element={<Login />} />
            <Route key="login" path="/login" element={<Login />}></Route>
            <Route key="home" path="/home" element={<Login />}></Route>
          </Routes>
      </Content>

    </Layout>
  )
}

export default App
