/* eslint-disable indent */
import React, { useState } from 'react'

import { Button, Card, Layout, message, Spin, Tabs, Col, Row } from 'antd'

import BaseInfo from './components/BaseInfo'
import PersonalInfo from './components/PersonalInfo'
import PasswordEdit from './components/PasswordEdit'
import PersonInfo from './components/PersonInfo'

import { getMyDetail } from '../../apis/my'
import { useFirstEffect } from '@utils/useFirstEffect'

import style from './index.module.less'

const { username } = JSON.parse(localStorage.getItem('user_info'))

const My = () => {
  const [loading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
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

  useFirstEffect(() => {
    getDetail()
  }, [])

  return (
    <Spin spinning={loading}>
      <Layout
        style={{
          height: '100%',
          minHeight: 'calc(100vh - 96px)',
          background: '#fff'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <PersonInfo userInfo={userInfo} setUserInfo={setUserInfo} />
          </Col>
          <Col span={12}>
            <Card
              title={
                <div className={style.cardTitle}>
                  <span>{isEdit ? '信息修改' : '查看信息'}</span>
                  {isEdit || (
                    <Button onClick={() => setIsEdit(true)}>编辑</Button>
                  )}
                </div>
              }
              style={{ minHeight: 'calc(100vh - 128px)' }}
              bodyStyle={{ padding: '0 24px', position: 'relative' }}
            >
              <Tabs
                items={[
                  {
                    key: 'base',
                    label: '基本信息',
                    children: (
                      <BaseInfo
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                      />
                    )
                  },
                  {
                    key: 'personal',
                    label: '个性信息',
                    children: (
                      <PersonalInfo
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                      />
                    )
                  },
                  isEdit
                    ? {
                        key: 'password',
                        label: '修改密码',
                        children: <PasswordEdit setIsEdit={setIsEdit} />
                      }
                    : undefined
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Layout>
    </Spin>
  )
}

export default My
