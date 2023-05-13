import React, { useEffect, useState } from 'react'

import { Empty, Input, List, message } from 'antd'
import FriendListItem from '../FriendListItem'

import { postUserList } from '@apis/talk'

import _ from 'lodash'

import style from './index.module.less'
const SearchFriendsModal = ({ setUserInfo, setUserInfoVisible }) => {
  const [addFriendList, setAddFriendsList] = useState([])

  useEffect(() => {
    getAddFriendList('')
  }, [])

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

  const handleSearch = _.debounce(({ target: { value } }) => {
    getAddFriendList(value)
  }, 2000)

  return (
    <div style={{ minHeight: 400 }}>
      <Input placeholder="支持输入用户名模糊查询" onChange={handleSearch} />
      <div className={style.listBox}>
        {addFriendList.length === 0 ? (
          <Empty />
        ) : (
          <div className={style.listContainer}>
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
