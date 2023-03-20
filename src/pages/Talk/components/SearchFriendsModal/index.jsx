import React, { useEffect, useState } from 'react'

import { Empty, Input, List, message } from 'antd'
import FriendListItem from '../FriendListItem'

import { postUserList } from '@apis/talk'

const SearchFriendsModal = ({ setUserInfo, setUserInfoVisible }) => {
  const [addFriendList, setAddFriendsList] = useState([])

  const getAddFriendList = async searchKey => {
    try {
      const { code, msg, data } = await postUserList(searchKey)
      if (code !== 0) {
        throw msg
      }
      setAddFriendsList(data)
    } catch (err) {
      message.error(err)
    }
  }

  const handleSearch = ({ target: { value } }) => {
    getAddFriendList(value)
  }

  useEffect(() => {
    setAddFriendsList([])
  }, [])

  return (
    <div style={{ minHeight: 400 }}>
      <Input placeholder="支持输入用户名模糊查询" onChange={handleSearch} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300
        }}
      >
        {addFriendList.length === 0 ? (
          <Empty />
        ) : (
          <div style={{ height: 300, width: '100%' }}>
            <List
              itemLayout="vertical"
              dataSource={addFriendList}
              renderItem={item => {
                return (
                  <FriendListItem
                    item={item}
                    setUserInfo={setUserInfo}
                    setUserInfoVisible={setUserInfoVisible}
                  />
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFriendsModal
