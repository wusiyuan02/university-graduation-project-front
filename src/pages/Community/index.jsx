import React, { useState } from 'react'
import { Avatar, Upload, Input, Form, Row, Col, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import CommunityPage from './components/CommunityPage'
import PersonPage from './components/PersonPage'
import InfoPage from './components/InfoPage'

import { postMomentAdd } from '@apis/community'
import style from './index.module.less'

const Community = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'))

  const [activityTab, setActivityTab] = useState(window.name || '1')
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState([])

  const handleOK = () => {
    postMomentAdd({ content, fileList }).then(res => {
      window.location.reload()
      setAddModalVisible(false)
    })
  }

  const handleChange = ({ fileList }) => setFileList(fileList)

  return (
    <div className={style.box}>
      <div className={style.header}>
        <Avatar
          src={userInfo.avatar}
          size={125}
          style={{ marginLeft: 16, position: 'absolute', zIndex: 100 }}
        />
        <Row className={style.nav}>
          <Col
            span={4}
            style={{ background: activityTab === '1' ? '#ededed' : '' }}
            className={style.center}
            onClick={() => {
              setActivityTab('1')
              window.name = '1'
            }}
          >
            社区
          </Col>

          <Col
            span={4}
            style={{ background: activityTab === '2' ? '#ededed' : '' }}
            className={style.center}
            onClick={() => {
              setActivityTab('2')
              window.name = '2'
            }}
          >
            个人
          </Col>
          <Col
            span={4}
            style={{ background: activityTab === '3' ? '#ededed' : '' }}
            className={style.center}
            onClick={() => {
              setActivityTab('3')
              window.name = '3'
            }}
          >
            最近消息
          </Col>
          <Col span={8}></Col>
          <Col span={4} className={style.center}>
            <PlusOutlined onClick={() => setAddModalVisible(true)} />
          </Col>
        </Row>
      </div>
      <div>
        {activityTab === '1' && <CommunityPage userInfo={userInfo} />}
        {activityTab === '2' && <PersonPage userInfo={userInfo} />}
        {activityTab === '3' && <InfoPage userInfo={userInfo} />}
      </div>
      <Modal
        title="新增动态"
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={handleOK}
      >
        <Form>
          <Form.Item name="content" label="内容 ">
            <Input.TextArea
              value={content}
              onChange={({ target: { value } }) => setContent(value)}
            />
          </Form.Item>
          <Form.Item name="pictures" label="上传图片 ">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Community
