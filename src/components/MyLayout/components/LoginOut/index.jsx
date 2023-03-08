/*
 * @Author: SiyuanWu
 * @Date: 2023-03-08 14:26:27
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-08 14:50:29
 * @Description:
 */
import React from 'react'
import { PoweroffOutlined } from '@ant-design/icons'
import { getLoginOut } from '@apis/login'
import { message, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
const LoginOut = () => {
  const navigate = useNavigate()
  const handleLoginOut = async () => {
    try {
      const { code, msg } = await getLoginOut()
      if (code !== 0) {
        throw msg
      }
      message.success('退出登录成功', 1, () => {
        localStorage.removeItem('user_info')
        navigate('/')
      })
    } catch (err) {
      message.error(err)
    }
  }
  return <Tooltip placement="bottom" title="点击退出登录">
    <PoweroffOutlined onClick={handleLoginOut} style={{ color: '#fff', fontSize: '20px' }} />
  </Tooltip>
}

export default LoginOut
