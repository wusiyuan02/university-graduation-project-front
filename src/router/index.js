/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 09:06:21
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-08 09:54:18
 * @Description:
 */
import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = React.lazy(() => import('../pages/Home'))
const Community = React.lazy(() => import('../pages/Community'))
const Talk = React.lazy(() => import('../pages/Talk'))
const My = React.lazy(() => import('../pages/My'))

const ROUTES_CONFIG = [{
  path: '/',
  key: 'default',
  element: <Navigate to="/login" />
}, {
  path: '/home',
  key: 'home',
  element: <Home />
}, {
  path: '/talk',
  key: 'talk',
  element: <Talk />
}, {
  path: '/community',
  key: 'community',
  element: <Community />
}, {
  path: '/my',
  key: 'my',
  element: <My />
}]

export default ROUTES_CONFIG
