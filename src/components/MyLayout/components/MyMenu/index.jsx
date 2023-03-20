import React, { useEffect, useState } from 'react'

import { Menu } from 'antd'

import {
  AppstoreOutlined,
  BankOutlined,
  MessageOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

const MENU_ITEMS = [
  {
    key: 'home',
    label: <Link to="/home">首页</Link>,
    icon: <BankOutlined />
  },
  {
    key: 'talk',
    label: <Link to="/talk">聊天室</Link>,
    icon: <MessageOutlined />
  },
  {
    key: 'community',
    label: <Link to="/community">社区</Link>,
    icon: <AppstoreOutlined />
  },
  {
    key: 'my',
    label: <Link to="/my">我的</Link>,
    icon: <UserOutlined />
  }
]

const MyMenu = () => {
  const [nowMenuItem, setNowMenuItem] = useState([])

  const { pathname } = useLocation()

  useEffect(() => {
    const nextMenuItem = pathname.split('/').filter(key => key)
    setNowMenuItem(nextMenuItem)
  }, [pathname])

  const handleChangeOpenKeys = ({ keyPath }) => {
    setNowMenuItem(keyPath)
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={nowMenuItem}
      onClick={handleChangeOpenKeys}
      items={MENU_ITEMS}
      style={{ flex: 1 }}
    />
  )
}
export default MyMenu
