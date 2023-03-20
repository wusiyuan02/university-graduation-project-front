import React, { useEffect, useState } from 'react'

import { Avatar, List, message, Modal, Space } from 'antd'
import {
  UsergroupAddOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import UserInfoModal from '@components/UserInfoModal'
import ChatBox from './components/ChatBox'
import SearchFriendsModal from './components/SearchFriendsModal'
import FriendsApplicationModal from './components/FriendsApplicationModal'

import { getFriendApplication, postFriendsList } from '@apis/talk'

const Talk = () => {
  const [addFriendsVisible, setAddFriendsVisible] = useState(false)
  const [friendsApplicationVisible, setFriendsApplicationVisible] =
    useState(false)
  const [userInfoVisible, setUserInfoVisible] = useState(false)
  const [applicationList, setApplicationList] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [chatInfo, setChatInfo] = useState({})

  useEffect(() => {
    getApplicationList()
    getFriendsList()
  }, [])

  const getFriendsList = async () => {
    try {
      const { code, data, msg } = await postFriendsList()
      if (code !== 0) {
        throw msg
      }
      if (data.length === 0) {
        return
      }
      setFriendsList(data)
      setChatInfo(data[0])
    } catch (err) {
      message.error(err)
    }
  }

  const getApplicationList = async () => {
    try {
      const { code, data, msg } = await getFriendApplication()
      if (code !== 0) {
        throw msg
      }
      setApplicationList(data)
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 96px)' }}>
      <List
        bordered={true}
        style={{
          width: 300,
          height: 'calc(100vh - 96px)',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
        header={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 42
            }}
          >
            <h3>好友列表</h3>
            <Space size={16}>
              <MailOutlined
                style={{
                  fontSize: 16,
                  cursor: 'pointer',
                  color: applicationList?.length > 0 && 'red'
                }}
                onClick={() => setFriendsApplicationVisible(true)}
              />
              <UsergroupAddOutlined
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => setAddFriendsVisible(true)}
              />
            </Space>
          </div>
        }
        dataSource={friendsList}
        renderItem={item => {
          const { avatar, nickname, username } = item
          return (
            <div
              style={{
                display: 'flex',
                height: 76,
                alignItems: 'center',
                cursor: 'pointer',
                background: chatInfo.username === username && '#ededed',
                paddingLeft: 16
              }}
              onClick={() => {
                setChatInfo(item)
              }}
            >
              <Avatar
                src={avatar}
                icon={<UserOutlined />}
                size={60}
                onClick={e => {
                  e.stopPropagation()
                  setUserInfo(item)
                  setUserInfoVisible(true)
                }}
              />
              <div style={{ paddingTop: 4, marginLeft: 16, flex: 1 }}>
                <div style={{ marginBottom: 4 }}>
                  <h5>{nickname || username}</h5>
                </div>
              </div>
            </div>
          )
        }}
      />
      <ChatBox chatPersonInfo={chatInfo} />
      {userInfo && (
        <UserInfoModal
          visible={userInfoVisible}
          userInfo={userInfo}
          onOk={() => setUserInfoVisible(false)}
          onCancel={() => setUserInfoVisible(false)}
        />
      )}
      {friendsApplicationVisible && (
        <Modal
          title="好友申请"
          width={800}
          open={friendsApplicationVisible}
          onOk={() => setFriendsApplicationVisible(false)}
          onCancel={() => setFriendsApplicationVisible(false)}
        >
          <FriendsApplicationModal
            listData={applicationList}
            onListChange={setApplicationList}
            setUserInfo={setUserInfo}
            setUserInfoVisible={setUserInfoVisible}
          />
        </Modal>
      )}
      {addFriendsVisible && (
        <Modal
          title="添加好友"
          width={800}
          open={addFriendsVisible}
          onOk={() => setAddFriendsVisible(false)}
          onCancel={() => setAddFriendsVisible(false)}
        >
          <SearchFriendsModal
            setUserInfo={setUserInfo}
            setUserInfoVisible={setUserInfoVisible}
          />
        </Modal>
      )}
    </div>
  )
}

export default Talk
