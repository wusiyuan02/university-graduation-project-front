import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postSignIn, postLoginIn } from '@apis/login'

import style from './index.module.less'
import { Input, message, Spin } from 'antd'
const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '', repassword: '' })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleUserNameChange = ({ target: { value } }) => {
    setLoginInfo({
      ...loginInfo,
      username: value
    })
  }

  const handlePassWordChange = ({ target: { value } }) => {
    setLoginInfo({
      ...loginInfo,
      password: value
    })
  }

  const handleRePassWordChange = ({ target: { value } }) => {
    setLoginInfo({
      ...loginInfo,
      repassword: value
    })
  }

  const handleLoginIn = async () => {
    setLoading(true)
    try {
      const { code, userInfo, msg } = await postLoginIn({ ...loginInfo })
      setLoading(false)
      if (code !== 0) {
        throw msg
      }
      message.success('登录成功', 1, () => {
        localStorage.setItem('user_info', JSON.stringify(userInfo))
        navigate('/home')
      })
    } catch (err) {
      message.error(err || '服务器异常，请稍后重试')
    }
  }

  const handleSignIn = async () => {
    if (loginInfo.password !== loginInfo.repassword) {
      message.error('两次密码需保持一致')
      return
    }
    setLoading(true)
    try {
      const { code, msg } = await postSignIn({ ...loginInfo })
      if (code !== 0) {
        throw msg
      }
      message.success('注册成功', 1, () => {
        setIsLogin && setIsLogin(true)
      })
    } catch (err) {
      message.error(err || '服务器异常，请稍后重试')
    }
    setLoading(false)
  }

  return <Spin spinning={loading}>
    <div className={style.loginBox}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span className={style.slogan}>不换</span>
        <h2 onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'LOGIN' : 'REGISTER'}</h2>
      </div>
      <div className={style.inputBox}>
        <Input value={loginInfo.username} onChange={handleUserNameChange} type="text" placeholder="请输入用户名" />
      </div>
      <div className={style.inputBox}>
        <Input value={loginInfo.password} onChange={handlePassWordChange} type="password" placeholder="请输入密码" />
      </div>
      {!isLogin && <div className={style.inputBox}>
        <Input value={loginInfo.repassword} onChange={handleRePassWordChange} type="password" placeholder="请再次输入密码" />
      </div>}
      <button onClick={isLogin ? handleLoginIn : handleSignIn}>{isLogin ? '登录' : '注册'}</button>
    </div>
  </Spin>
}

export default Login
