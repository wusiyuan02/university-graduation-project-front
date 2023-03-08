import React from 'react'
import { Outlet } from 'react-router-dom'

import style from './index.module.less'
import { Layout, Spin } from 'antd'
import MyMenu from '@components/MyMenu'

const { Header, Content } = Layout

const MyLayout = () => {
  return <Layout>
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
        <React.Suspense fallback={<Spin />}>
          <Outlet />
        </React.Suspense>
      </Content>
  </Layout>
}

export default MyLayout
