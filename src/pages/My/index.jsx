import React, { useEffect, useState } from 'react'

import { Card, Col, Layout, message, Row, Spin, Tabs } from 'antd'

import BaseInfo from './components/BaseInfo'
import PersonalInfo from './components/PersonalInfo'
import PasswordEdit from './components/PasswordEdit'

import style from './index.module.less'
import { getMyDetail } from '../../apis/my'

const { username } = JSON.parse(localStorage.getItem('user_info'))

const My = () => {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({ username })

  const getDetail = async () => {
    setLoading(true)
    try {
      const { code, data, msg } = await getMyDetail({ username })
      setLoading(false)
      if (code !== 0) {
        throw msg
      }
      setUserInfo(data)
    } catch (err) {
      message.error(err)
    }
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <Spin spinning={loading} >
      <Layout style={{ height: '100%', minHeight: 'calc(100vh - 96px)' }}>
        <Layout.Sider width="800" style={{ background: '#fff', padding: '16px' }}>
          <Card title="个人信息" style={{ minHeight: 'calc(100vh - 128px)' }}>
            <Row style={{ borderBottom: '1px solid #f0f0f0' }}>
              <Col className={style.antCol} span={6}>昵称:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.nickname}</Col>
              <Col className={style.antCol} span={6}>用户名:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.username}</Col>
              <Col className={style.antCol} span={6}>电话:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.telephone}</Col>
              <Col className={style.antCol} span={6}>QQ/微信:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.qqOrWechat}</Col>
              <Col className={style.antCol} span={6}>邮箱:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.email}</Col>
              <Col className={style.antCol} span={6}>注册时间:</Col>
              <Col className={style.antColContent} span={18}>{userInfo.registerTime}</Col>
            </Row>
          </Card>
        </Layout.Sider>
        <Layout.Content style={{ background: '#fff', padding: '16px', minWidth: 600 }}>
          <Card title="信息修改" style={{ minHeight: 'calc(100vh - 128px)' }} bodyStyle={{ padding: '0 24px' }}>
            <Tabs items={[
              {
                key: 'base',
                label: '基本信息',
                children: <BaseInfo userInfo={userInfo} />
              }, {
                key: 'personal',
                label: '个性信息',
                children: <PersonalInfo userInfo={userInfo} />
              }, {
                key: 'password',
                label: '修改密码',
                children: <PasswordEdit />
              }
            ]} />
          </Card>
        </Layout.Content>
      </Layout >
    </Spin>
  )
}

export default My
